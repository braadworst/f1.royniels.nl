const superagent  = require('superagent');
const uuid        = require('uuid/').v4;
const querystring = require('querystring');
const crypto      = require('crypto');
const logger      = require('minilog')('middleware:loginProcess');
require('minilog').enable();

module.exports = (function() {

  let state;

  return {
    consent(settings) {
      return function(request, response, next, relay) {
        state = uuid();
        const parameters = Object.assign({
          state,
          client_id    : settings.clientId,
          redirect_uri : settings.redirectUri,
        }, settings.consent.parameters ? settings.consent.parameters : {});

        logger.info('Redirecting user to network consent page');
        relay.router.redirect(`${ settings.consent.url }?${ querystring.stringify(parameters) }`);
      }
    },
    token(settings) {
      return async function(request, response, next, relay) {

        const api        = relay.api;
        const router     = relay.router;
        const parameters = querystring.parse(request.url.split('?').pop());

        if (state !== parameters.state) {
          router.redirect('/');
          return;
        }

        try {
          // Exchange for an access token
          const accessToken = await fetchAccessToken(
            settings.token.url,
            Object.assign({
              code          : parameters.code,
              state         : parameters.state,
              client_secret : settings.clientSecret,
              client_id     : settings.clientId,
              redirect_uri  : settings.redirectUri,
            }, settings.token.parameters ? settings.token.parameters : {})
          );

          logger.info('Got access token back from network');

          // Get the user information from the particular network
          let user = await fetchUser(
            settings.email.url,
            Object.assign({
              access_token: accessToken
            }, settings.email.parameters ? settings.email.parameters : {})
          );

          logger.info('Got user information from network');

          // Create a new token for the user, that is not bound to any network, so
          // we don't by accident give other people access, when our db gets compromised
          user.token = uuid();

          setCookieToken(response, encrypt(user.token, relay.settings));

          // Check update the token if the user exists, otherwise create new user
          const currentUser = await api.get('userByEmail', user.email);

          if (currentUser) {
            logger.info('Found existing user, merging information');
            user.id = currentUser.id;
            // If there is already a username, then don't set a new one
            if (currentUser.name && user.name) {
              delete user.name;
            }
          }

          // Set new user object
          await api.set('user', user);
          logger.info('Saved the user information to the database');

          router.redirect('/standings');
        } catch(error) {
          logger.error(error);
          router.redirect('/');
        }
      }

      function setCookieToken(response, value) {
        let tomorrow = new Date();
        tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1)).toUTCString();

        logger.info(`write cookie token ${ value } expires ${ tomorrow }`);

        response.setHeader('Set-Cookie', [
          'token=' + value,
          'Secure',
          'SameSite=Strict',
          'Expires=' + tomorrow,
          'Domain=localhost',
          'Path=/'
        ].join('; '));
      }

      function encrypt(token, settings) {
        const cipher       = crypto.createCipher(settings.encryption.mode, settings.encryption.passphrase);
        let encryptedToken = cipher.update(token,'utf-8','hex')
        encryptedToken    += cipher.final('hex');
        return encryptedToken;
      }

      function cleanResult(data) {

        // Get all the fields we need and send em to the api for checking
        // Array is github
        let user;
        if (Array.isArray(data)) {
          user = data
            .filter(row => row.primary)
            .map(row => {
              return {
                email : row.email,
                name  : row.email // Doesn't have a username
              }
            })
            .pop();
        } else {
          user = {
            email : data.email,
            name  : data.name ? data.name : data.email
          }
        }

        return user;
      }

      function fetchUser(uri, qs) {
        return new Promise((resolve, reject) => {
          // Get the access token
          superagent
            .get(uri)
            .query(qs)
            .set('User-Agent', 'F1 Manager')
            .end((error, response) => {
              if (error) {
                reject(error);
              } else {
                resolve(cleanResult(response.body));
              }
            });
        });
      }

      function fetchAccessToken(uri, qs) {
        return new Promise((resolve, reject) => {
          // Get the access token
          superagent
            .post(uri)
            .send(querystring.stringify(qs))
            .end((error, response) => {
              if (error) {
                reject(error);
              } else if (response.body.error) {
                reject(body);
              } else {
                resolve(response.body.access_token);
              }
            });
        });
      }
    }
  }
}());

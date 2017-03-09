const superagent  = require('superagent');
const settings    = require('package-settings');
const uuid        = require('uuid/').v4;
const querystring = require('querystring');
const api         = require('../shared/api');
const encrypt     = require('./encrypt');
const cookies     = require('./cookies');
const query       = require('../shared/api/query');

module.exports = function(router) {

  // Setup the routes for each login network
  const domain   = settings.webserver.domain + ':' + settings.webserver.port;
  const networks = ['facebook', 'google', 'github'];

  networks.forEach(network => {

    // We use this to check in the response if the source matches
    let state;
    let networkSettings = settings.webserver.networks[network];

    // Get the user consent by sending them to the specific network
    // Get consent and request token
    router.get('/auth/' + network, (request, response) => {
      const parameters = consentParameters(network, networkSettings);
      state = parameters.state;
      router.redirect(`${ networkSettings.consent.url }?${ querystring.stringify(parameters) }`);
    });

    // We got a temp token, upgrade it to an access token
    router.get('/auth/' + network + '/callback', async function(request, response) {
      let parameters = querystring.parse(request.url.split('?').pop());

      // Not the right server, redirect home
      if (parameters.state !== state) {
        router.redirect('/');
      }

      try {
        // Exchange for an access token
        const accessToken = await fetchAccessToken(
          networkSettings.token.url,
          tokenParameters(network, parameters, networkSettings)
        );

        // Get the user information from the particular network
        let user = await fetchUser(
          networkSettings.email.url,
          emailParameters(network, networkSettings, accessToken)
        );

        // Create a new token for the user, that is not bound to any network, so
        // we don't by accident give other people access, when our db gets compromised
        user.token = encrypt.encrypt(uuid());

        // Set the cookie
        cookies.set(response, 'token', user.token);

        // Check update the token if the user exists, otherwise create new user
        let currentUser = await api.get.user(query().filter('token', user.token));
        console.log(currentUser);
        if (currentUser.length) {
          // Check if there is already a username on the current object, if not
          // and we found one on a new login set it
          if (!currentUser.name && user.name) {
            currentUser.name = user.name;
          }
          currentUser.token = user.token;
          user = currentUser;
        }
        await api.set.user(user);

        // Finally redirect the user to the standings page
        router.redirect('/standings');
      } catch(error) {
        console.log(error);
        router.redirect('/');
      }
    });
  });

  function tokenParameters(network, parameters, settings) {
    parameters = Object.assign({
      code          : parameters.code,
      state         : parameters.state,
      client_secret : settings.clientSecret,
      client_id     : settings.clientId,
      redirect_uri  : domain + '/auth/' + network + '/callback'
    }, settings.token.parameters ? settings.token.parameters : {});

    return parameters;
  }

  function consentParameters(network, settings) {
    const parameters = Object.assign({
      state        : uuid(),
      client_id    : settings.clientId,
      redirect_uri : domain + '/auth/' + network + '/callback',
    }, settings.consent.parameters ? settings.consent.parameters : {});

    return parameters;
  }

  function emailParameters(network, settings, accessToken) {
    return Object.assign(
      {},
      { access_token: accessToken },
      settings.email.parameters ? settings.email.parameters : {}
    );
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
            console.log('fetchUSer');
            reject(error);
          } else {
            resolve(cleanResult(response.body));
          }
        });
    });
  }

  function fetchAccessToken(uri, qs) {
    console.log(uri);
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

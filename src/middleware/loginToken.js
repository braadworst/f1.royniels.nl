const superagent  = require('superagent');
const uuid        = require('uuid/').v4;
const querystring = require('querystring');

module.exports = settings => {

  return async function(request, response, next, relay) {

    const api        = require('../api')(relay.settings);
    const retour     = relay.router;
    const parameters = querystring.parse(request.url.split('?').pop());

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

      // Get the user information from the particular network
      let user = await fetchUser(
        settings.email.url,
        Object.assign({
          access_token: accessToken
        }, settings.email.parameters ? settings.email.parameters : {})
      );

      // Create a new token for the user, that is not bound to any network, so
      // we don't by accident give other people access, when our db gets compromised
      user.token = uuid();

      // Check update the token if the user exists, otherwise create new user
      const currentUser = await api.get('/users?filters[email]=' + user.email);

      if (currentUser) {
        user.id = currentUser.id;
        // If there is already a username, then don't set a new one
        if (currentUser.name && user.name) {
          delete user.name;
        }
      }

      // Set new user object
      await api.set('/users', user);

      router.redirect('/standings');
    } catch(error) {
      console.log(error);
      router.redirect('/');
    }
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

const fetch       = require('request');
const settings    = require('package-settings');
const uuid        = require('uuid/').v4;
const querystring = require('querystring');
const api         = require('../../shared/data/api');

module.exports = function(router) {

  // Route the login page, with its own template
  router.get('/', (request, response) => {
    const store      = createStore();
    const template   = require('../template/login');
    const renderer   = require('../renderer')(template, store);
    const components = require('../../shared/components')(store);
    components.init(renderer);

    // Callback for response, when the data is loaded
    renderer.finished(html => {
      response.end(html);
    });

    // Load the login component
    store.dispatch(action.create('componentLogin'));

    return {
      store,
      renderer
    }
  });

  // Setup the routes for each login network
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
      router.redirect(`${ network.consent.url }?${ querystring.stringify(parameters) }`);
    });

    // We got a temp token, upgrade it to an access token
    router.get('/auth/' + network + '/callback', async function(request, response) {
      let parameters = querystring.parse(request.url.split('?').pop());

      // Not the right server, redirect home
      if (parameters.state !== state) {
        router.redirect(domain);
      }

      try {
        // Exchange for an access token
        const accessToken = await fetchAccessToken(
          networkSettings.token.url,
          tokenParameters(network, parameters, networkSettings)
        );
        // Get the user information from the particular network
        const user = await fetchUser(
          networkSettings.email.url,
          emailParameters(network, settings, accessToken)
        );
        // Create a session object for the users

        // Check if the user exists, if not add it
        if (!await api.userExists(user)) {
          await api.userCreate(user);
        }
        // Finally redirect the user to the standings page
        router.redirect('/standings');
      } catch(error) {
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

    return querystring.stringify(parameters);
  }

  function consentParameters(network, settings) {
    const parameters = Object.assign({
      state        : uuid(),
      client_id    : settings.clientId,
      redirect_uri : domain + '/auth/' + network + '/callback',
    }, settings.consent.parameters ? settings.consent.parameters : {});

    return querystring.stringify(parameters);
  }

  function emailParameters(network, settings, accessToken) {
    return querystring.stringify(Object.assign(
      {},
      { accessToken },
      settings.email.parameters ? settings.email.parameters : {}
    ));
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
      fetch.post({ uri, qs, headers : { 'User-Agent' : 'F1 Manager' } }, (error, result, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(cleanResult(body));
        }
      });
    });
  }

  function fetchAccessToken(uri, qs) {
    return new Promise((resolve, reject) => {
      // Get the access token
      fetch.post({ uri, qs }, (error, result, body) => {
        if (error) {
          reject(error);
        } else {
          try {
            body = JSON.parse(body);
          } catch (error) {
            body = querystring.parse(body);
          }
          if (error || body.error) {
            reject(error);
          } else {
            resolve(querystring.parse(body).access_token);
          }
        }
      });
    });
  }
}

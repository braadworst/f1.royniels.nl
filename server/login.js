const requestLib  = require('request');
const settings    = require('package-settings');
const uuid        = require('uuid/').v4;
const querystring = require('querystring');

module.exports = function(router) {

  const domain = settings.webserver.domain + ':' + settings.webserver.port;

  for (let key in settings.webserver.networks) {

    const network = settings.webserver.networks[key];
    const state   = uuid();
    let accessToken;

    // Get consent and request token
    router.get(network.router.request, (request, response) => {

      let qs = {
        state,
        client_id : network.clientId,
        redirect_uri : domain + network.router.accessToken,
        scope : network.scope
      }

      if (network.requestQs) {
        qs = Object.assign({}, qs, network.requestQs);
      }

      response.writeHead(302, {
        location  : network.requestUri + '?' + querystring.stringify(qs)
      });
    });

    // Exchange request token for access token
    router.get(network.router.accessToken, (request, response) => {

      const params = querystring.parse(request.url.split('?').pop());

      // Not the right server
      if (params.state !== state) {
        response.writeHead(302, { location : domain });
      }

      let qs = {
        code : params.code,
        state : params.state,
        client_secret : network.clientSecret,
        client_id : network.clientId,
        redirect_uri : domain + network.router.accessToken
      }

      if (network.accessTokenQs) {
        qs = Object.assign({}, qs, network.accessTokenQs);
      }

      // Get the access token
      requestLib.post({
        uri : network.accessTokenUri,
        qs
      }, (error, result, body) => {

        try {
          body = JSON.parse(body);
        } catch (error) {
          body = querystring.parse(body);
        }

        if (error || body.error) {
          response.writeHead(302, { location : domain });
        }

        accessToken = querystring.parse(body).access_token;

        let qs = {
          access_token : body.access_token
        };

        if (network.emailUrlQs) {
          qs = Object.assign({}, qs, network.emailUrlQs);
        }

        // Get email address
        requestLib.get({
          uri : network.emailUri,
          qs,
          headers : {
            'User-Agent' : network.userAgent
          }
        }, (error, result, body) => {
          if (error) {
            response.writeHead(302, { location : domain });
          }
          try {
            body = JSON.parse(body);
          } catch(error) {
            response.writeHead(302, { location : domain });
          }

          // Get all the fields we need and send em to the api for checking
          if (!Array.isArray(body)) {
            body = [body];
          }
          console.log(body);
          body = body.map(row => {
            output = {};
            if (row.email) {
              output.email = row.email;
            }

            if (row.name) {
              output.name = row.name;
            }

            return output;
          });
          console.log(body);
          response.writeHead(302, { location : domain + network.router.success });
        });
      });
    });
  }
}

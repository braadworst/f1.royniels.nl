module.exports = (settings) => {

  return function(request, response, next, relay) {

    const uuid        = require('uuid/').v4;
    const querystring = require('querystring');
    const parameters = Object.assign({
      state        : uuid(),
      client_id    : settings.clientId,
      redirect_uri : settings.redirectUri,
    }, settings.consent.parameters ? settings.consent.parameters : {});

    router.redirect(`${ networkSettings.consent.url }?${ querystring.stringify(parameters) }`);
  }
};

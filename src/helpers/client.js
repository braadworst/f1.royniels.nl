module.exports = (request, response, next, relay) => {
  const renderer = require('../renderer/client');
  const publish  = require('../publish')(relay.settings.client.apiDomain);
  const logger   = require('../logger');
  
  next({ renderer, publish, logger });
}

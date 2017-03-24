const settings = require('../settings/webserver');
const protocol = require('http');
const server   = protocol.createServer();
const road     = require('lr-core');
const router   = require('lr-router-http')('webserver', server, settings.redirectDomain);
const api      = require('lr-api-client-http');
const renderer = require('lr-renderer-server');

server.listen(settings.port, settings.domain, function() {
  logger.info(`server running on ${ settings.domain }:${ settings.port }`);
});

module.exports = () => {
  road
    .environment('webserver')
    .extension('router', router)
    // .extension('renderer', renderer)
    // .extension('api', api)
    .middleware({
      'general.statics' : require('./middleware/statics'),
      'parsers.cookies' : require('./middleware/parsers/cookies'),
      'parsers.decrypt' : require('./middleware/parsers/decrypt'),
      'parsers.token'   : require('./middleware/parsers/token'),
    })

  require('./shared')(road);

}

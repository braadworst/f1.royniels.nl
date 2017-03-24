const settings = require('../settings/webserver');
const protocol = require('http');
const server   = protocol.createServer();
const road     = require('lr-core');
const router   = require('lr-router-http')('webserver', server, settings.redirectDomain);
const api      = require('lr-http-client');
const renderer = require('lr-server-renderer');

server.listen(settings.port, settings.domain, function() {
  logger.info(`server running on ${ settings.domain }:${ settings.port }`);
});

module.exports = () => {
  road
    .environment('webserver')
    .extension('router', router)
    .extension('renderer', renderer)
    .extension('api', api)
    .middleware({
      general : require('../middleware/general')
      parsers : require('../middleware/parsers'),
      templating : {
        layout : require('../middleware/templating/layout'),
        loaded : require('../middleware/templating/loaded'),
        failed : require('../middleware/templating/failed'),
      }
    })

  require('./shared')(road);
}

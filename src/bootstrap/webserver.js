const settings = require('../extensions/settings/webserver')();
const protocol = require('http');
const server   = protocol.createServer();
const road     = require('lr-core');
const router   = require('lr-server-router')(server, settings.redirectDomain);
const api      = require('lr-http-client');
const renderer = require('lr-server-renderer');

server.listen(settings.port, settings.domain, function() {
  console.log(`server running on ${ settings.domain }:${ settings.port }`);
});

road
  .environment('webserver')
  .where('webserver')
    .router('router', router)
    .extension('renderer', renderer)
    .extension('api', api)
    .extension('debug', require('lr-debug')('f1manager'))
    .middleware({
      general     : require('../middleware/general'),
      parsers     : require('../middleware/parsers'),
      serializers : require('../middleware/serializers'),
      templating : {
        layout : require('../middleware/templating/layouts'),
        loaded : require('../middleware/templating/loaded'),
        failed : require('../middleware/templating/failed'),
      }
    });

require('./road')(road);

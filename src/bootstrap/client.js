const settings = require('../settings/client');
const road     = require('lr-core');
const router   = require('lr-client-router');
const api      = require('lr-http-client');
const renderer = require('lr-server-renderer');

module.exports = () => {
  road
    .environment('client')
    .extension('router', router)
    .extension('renderer', renderer)
    .extension('api', api)
    .extension('settings', settings)
    .middleware({
      mutators : require('../middleware/mutators'),
      templating : {
        events  : require('../middleware/templating/events'),
        loaded  : require('../middleware/templating/loaded'),
        loading : require('../middleware/templating/loading'),
        failed  : require('../middleware/templating/failed')
      }
    })

  require('./shared')(road);
}

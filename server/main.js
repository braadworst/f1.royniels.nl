const settings = require('package-settings');

// Create HTTP2 server
let server = require('spdy').createServer(settings.webserver.certs);

// Setup router
const router = require('../shared/routing/router')(server);

// Handle statics
router.before(require('serve-static')('public'));

// Setup login routes and strategies
require('./login')(router);

// Add before and after for the routes
router.before(async function(request, response, next) {
  const renderer   = require('./renderer');
  const state      = require('../shared/state')(require('./template/default'));
  const components = require('../shared/components')(renderer.render, state);

  renderer.template();

  await component.create('nav');

  next({ state, components });
}, '/');

router.after((request, response, next, relay) => {
  relay.renderer.state(relay.state.get());
  response.end(relay.renderer.html());
});

server.listen(settings.webserver.port, function() {
  console.log('Server listening on port: ' + settings.webserver.port);
});

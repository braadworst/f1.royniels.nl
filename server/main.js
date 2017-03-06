const settings    = require('package-settings');
const action      = require('../shared/actions/component');

// Create HTTP2 server
let server = require('spdy').createServer(settings.webserver.certs);

// Setup router
const router = require('../shared/router')(server);

// Handle statics
router.before(require('serve-static')('public'));

// Setup login routes and strategies
require('./login')(router);

// Add before and after for the routes
router.before(async function(request, response, next) {
  const store      = require('../shared/store')();
  const template   = require('./template/default');
  const renderer   = require('./renderer')(template, store);
  const components = require('../shared/components')(store);
  components.init(renderer);

  store.dispatch(action.create('componentNav'));

  // Callback for response, when the data is loaded
  renderer.finished(html => {
    response.end(html);    
  });

  // pass over arguments that we need in the routes or after callback
  next({ store, renderer });
}, '/');

server.listen(settings.webserver.port, function() {
  console.log('Server listening on port: ' + settings.webserver.port);
});

const settings     = require('package-settings');
const spdy         = require('spdy');
const watch        = require('redux-watch');
const createStore  = require('../shared/store');
const action       = require('../shared/actions/component');

// Create HTTP2 server
let server = spdy.createServer(settings.webserver.certs);

// Setup router
const router = require('../shared/router')(server);

// Setup login routes and strategies
require('./login')(router);

// Handle static
require('./static')(server);

// Add before and after for the routes
router.before((request, response, args) => {
  const store      = createStore();
  const template   = require('./template');
  const renderer   = require('./renderer')(template, store);
  const components = require('../shared/components')(store);
  components.init(renderer);

  store.dispatch(action.create('componentNav'));

  // Callback for response, when the data is loaded
  renderer.finished(html => {
    response.end(html);
  });

  // pass over arguments that we need in the routes or after callback
  return {
    store,
    renderer
  }
});

// Login route
router.get('/', (request, response) => {
  const store      = createStore();
  const template   = require('./templateLogin');
  const renderer   = require('./renderer')(template, store);
  const components = require('../shared/components')(store);
  components.init(renderer);

  // Callback for response, when the data is loaded
  renderer.finished(html => {
    response.end(html);
  });

  store.dispatch(action.create('componentLogin'));

  return {
    store,
    renderer
  }
});


server.listen(settings.webserver.port, function() {
  console.log('Server listening on port: ' + settings.webserver.port);
});

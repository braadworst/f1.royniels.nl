const settings     = require('package-settings');
const spdy         = require('spdy');
const watch        = require('redux-watch');
const createStore  = require('../shared/store');
const action       = require('../shared/actions/component');
const isEmpty      = require('lodash/fp/isEmpty');

// Create HTTP2 server
let server = spdy.createServer(settings.webserver.certs);

// Setup router
const router = require('../shared/router')(server);

// Handle static
require('./static')(server);

// Add before and after for the routes
router.before((request, response, args) => {
  const store      = createStore();
  const template   = require('./template');
  const renderer   = require('./renderer')(template, store);
  const components = require('../shared/components')(store);
  components.init(renderer);

  // Add components here that you want to be loaded on every page, things like
  // menu and footer, etc
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

server.listen(settings.webserver.port, function() {
  console.log('Server listening on port: ' + settings.webserver.port);
});

const settings    = require('package-settings');
const spdy        = require('spdy');
const compression = require('compression');
const createStore = require('../shared/store');
const action      = require('../shared/actions/component');

// Create HTTP2 server
let server = spdy.createServer(settings.webserver.certs);

// Handle static files
require('./static')(server);

// Setup router
const router = require('../shared/router')(server);

// Add before and after for the routes
router.before((request, response, args) => {
  let store      = createStore();
  let template   = require('./template');
  let renderer   = require('./renderer')(template);
  let components = require('../shared/components')(store);
  components.init(renderer);

  // Add components here that you want to be loaded on every page, things like
  // menu and footer, etc
  store.dispatch(action.create('componentNav'));

  // Carry over arguments to other middleware
  return {
    store,
    renderer
  }
});

router.after((request, response, args) => {
  args.renderer.addState(args.store.getState());
  response.end(args.renderer.getTemplate());
});

server.listen(settings.webserver.port, function() {
  console.log('Server listening on port: ' + settings.webserver.port);
});

const settings     = require('package-settings');
const spdy         = require('spdy');
const watch        = require('redux-watch');
const createStore  = require('../shared/store');
const action       = require('../shared/actions/component');
const handleStatic = require('./static');

// Create HTTP2 server
let server = spdy.createServer(settings.webserver.certs);

// Setup router
const router = require('../shared/router')(server);

// Add before and after for the routes
router.before((request, response, args) => {

  // is not static
  if (!handleStatic(request, response)) {
    const store      = createStore();
    const template   = require('./template');
    const renderer   = require('./renderer')(template, store);
    const components = require('../shared/components')(store);
    components.init(renderer);

    // Add components here that you want to be loaded on every page, things like
    // menu and footer, etc
    store.dispatch(action.create('componentNav'));

    // Function that will be called once the page has completely loaded the all
    // the data, although we hook it up in the before, it will only be triggered
    // when needed
    // renderer.finished(html => {
      response.end('hey');
    // });
  }
});

server.listen(settings.webserver.port, function() {
  console.log('Server listening on port: ' + settings.webserver.port);
});

const settings = require('package-settings');
const paths    = require('../shared/routing/paths');
const cookies  = require('./cookies');
const protocol = require('spdy');

// Create HTTP2 server
let server = protocol.createServer(settings.webserver.certs);

// Setup router
const router = require('../shared/routing/router')(server);

// Handle statics
router.before(require('./statics'));

// Setup the middleware for a new store, components and the renderer
router.before((request, response, next) => {
  console.log('setup renderer, state and componets');
  let renderer;
  if (request.url === '/') {
    renderer = require('./renderer')(require('./templates/login'));
  } else {
    renderer = require('./renderer')(require('./templates/default'));
  }
  const state      = require('../shared/state')();
  const components = require('../shared/components')(renderer, state);
  next({ state, renderer, components });
});

// Logged in middleware
router.before(async function(request, response, next, relay) {
  console.log('check logged in status');
  const token = cookies.getCookies(request).token;
  if (!token) {
    router.redirect(paths.LOGIN);
  } else {
    try {
      const user = await relay.state.get('data.user');
      if (!user) {
        router.redirect(paths.LOGIN);
        return;
      }
    } catch (error) {
      router.redirect(paths.LOGIN);
      return;
    }
  }
  next();
}, paths.LOGIN);

// Render nav except on login page
router.before(async function(request, response, next, relay) {
  console.log('Render navigation');
  await relay.components.create('nav');
  next();
}, paths.LOGIN);

// Logout route
router.get(paths.LOGOUT, (request, response) => {
  console.log('logout route');
  cookies.unset(response, 'token');
  router.redirect(paths.LOGIN);
});

// Route the login page
router.get(paths.LOGIN, (request, response, next, relay) => {
  console.log('login route');
  relay.components.create('login');
  next();
});

// Setup login routes and strategies
require('./login')(router);

// Add the state and render the whole page
router.after((request, response, next, relay) => {
  console.log('after, response');
  relay.renderer.state(relay.state.get());
  response.end(relay.renderer.html());
});

server.listen(settings.webserver.port, function() {
  console.log('Server listening on port: ' + settings.webserver.port);
});

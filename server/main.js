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
  let renderer;
  if (request.url === '/') {
    renderer = require('./renderer')(require('./templates/login'));
  } else {
    renderer = require('./renderer')(require('./templates/default'));
  }
  const state      = require('../shared/state')();
  const components = require('../shared/components')(renderer, state);
  next({ state, components, renderer });
});

// Logged in middleware
// router.before(async function(request, response, next, relay) {
//   const token = cookies.getCookies(request).token;
//   if (!token) {
//     router.redirect(paths.LOGIN);
//   } else {
//     try {
//       const user = await relay.state.get('data.user');
//       if (!user) {
//         router.redirect(paths.LOGIN);
//         return;
//       }
//     } catch (error) {
//       router.redirect(paths.LOGIN);
//       return;
//     }
//   }
//   next();
// }, paths.LOGIN);

// Render nav except on login page
router.before(async function(request, response, next, relay) {
  await relay.components.create('nav');
  next();
}, paths.LOGIN);

// Logout route
router.get(paths.LOGOUT, (request, response) => {
  cookies.unset(response, 'token');
  router.redirect(paths.LOGIN);
});

// Route the login page
router.get(paths.LOGIN, async function(request, response, next, relay) {
  await relay.components.create('login');
  next();
});

// Setup login routes and strategies
require('./login')(router);

// Add the state and render the whole page
router.after((request, response, next, relay) => {
  relay.renderer.state(relay.state.preloaded());
  response.end(relay.renderer.html());
});

server.listen(settings.webserver.port, function() {
  console.log('Server listening on port: ' + settings.webserver.port);
});

const settings = require('../settings')('server');
const protocol = require('spdy');

// Create HTTP2 server
const server = protocol.createServer(settings.certs);


//
// // Render nav except on login page
// router.before((request, response, next, relay) => {
//   relay.components.create('nav');
//   relay.state.watch('component', data => {
//     if (data.name === 'nav' && data.type === 'loaded') {
//       next();
//       relay.state.unwatch('component');
//     }
//   });
// }, paths.LOGIN);
//
// // Logout route
// router.get(paths.LOGOUT, (request, response) => {
//   cookies.unset(response, 'token');
//   router.redirect(paths.LOGIN);
// });
//
// // Route the login page
// router.get(paths.LOGIN, (request, response, next, relay) => {
//   relay.components.create('login');
//   relay.state.watch('component', data => {
//     console.log(data);
//     if (data.name === 'login' && data.type === 'loaded') {
//       next();
//       relay.state.unwatch('component');
//     }
//   });});
//
// // Setup login routes and strategies
// require('./login')(router);
//
// // Add the state and render the whole page
// router.after((request, response, next, relay) => {
//   relay.renderer.state(relay.state.preloaded());
//   response.end(relay.renderer.html());
// });
//
// router.noMatch((request, response) => {
//   response.writeHead(404, {'Content-Type' : 'text/plain'});
//   response.write('Page not found');
//   response.end();
// });
//
server.listen(settings.webserver.port, function() {
  console.log('Server listening on port: ' + settings.webserver.port);
});

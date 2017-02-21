const router   = require('cs-router');
const settings = require('package-settings');
const database = require('./store')(settings);
const spdy     = require('spdy');

// Create HTTP2 server
let server = spdy.createServer(settings.apiserver.certs);

// Load all static db content
require('./store/createStatics')(database);

// Setup routes for api server
require('./router')(server, database);

server.listen(settings.apiserver.port, function() {
  console.log('Server listening on port: ' + settings.apiserver.port);
});

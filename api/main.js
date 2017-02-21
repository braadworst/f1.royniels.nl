const settings    = require('package-settings');
const spdy        = require('spdy');

// Create HTTP2 server
let server = spdy.createServer(settings.apiserver.certs);

server.listen(settings.apiserver.port, function() {
  console.log('Server listening on port: ' + settings.apiserver.port);
});

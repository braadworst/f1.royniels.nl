const router          = require('./router');
const settings        = require('./settings');
const spdy            = require('spdy');
const express         = require('express');
const compression     = require('compression');
const app             = express();

// Enable compression on all responses
app.use(compression());

// Set static folder
app.use(express.static('./public'));

// Create HTTP2 server
let server = spdy.createServer(settings.options, app);

// Setup routes for server site rendering
router(app);

server.listen(settings.port, function() {
  console.log('Server listening on port: ' + settings.port);
});

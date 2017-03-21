const protocol = require('http');

module.exports = settings => {
  // Web server
  const server = protocol.createServer();

  server.listen(settings.port, settings.domain, function() {
    logger.info(`server running on ${ settings.domain }:${ settings.port }`);
  });

  return server;
}

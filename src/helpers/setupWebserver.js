module.exports = (request, response, next, relay) => {
  const renderer   = require('../renderer/webserver')();
  const api        = require('../api')(relay.settings.apiserver.uri);

  next( {
    components,
    renderer,
    api,
  });
}

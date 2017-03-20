module.exports = (request, response, next, relay) => {
  const renderer   = require('../renderer/webserver')();
  const api        = require('../api')(relay.settings.apiserver.uri);
  const registered = require('../components/register');
  const components = require('../components')(registered, api, renderer);

  next( {
    components,
    renderer,
    api,
  });
}

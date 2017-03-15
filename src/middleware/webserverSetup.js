module.exports = (request, response, next) => {
  const settings   = require('../settings')('webserver');
  const renderer   = require('../renderer/webserver')();
  const api        = require('../api')(settings.apiDomain);

  const registered = require('../components/register');
  const components = require('../components')(registered, api, renderer);

  next( {
    components,
    renderer,
    api,
    settings
  });
}

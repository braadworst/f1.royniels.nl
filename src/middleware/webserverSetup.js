module.exports = (request, response, next) => {
  const components = require('../components')(require('../components/register'));
  const renderer   = require('../renderer/webserver')();
  const api        = require('../api')();
  const settings   = require('../settings')('webserver');

  // Add callbacks
  components.render((html, placeholder) => {
    renderer.render(html, placeholder);
  });

  components.fetch(dataset => {
    if (api.get[dataset]) {
      return api.get[dataset]();
    } else {
      throw new Error(`Could not find a method ${ dataset } on the api`);
    }
  });

  next( {
    components,
    renderer,
    api,
    settings
  });
}

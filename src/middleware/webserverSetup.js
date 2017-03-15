module.exports = (request, response, next) => {
  const components = require('../components')();
  const renderer   = require('../renderer/webserver')();
  const api        = require('../api')();
  const settings   = require('../settings')('webserver');

  // Register components
  components.register(require('../components/register'));

  // Add callbacks
  components.template.render((html, placeholder) => {
    renderer.render(html, placeholder);
  });

  components.data.fetch(dataset => {
    console.log(dataset);
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

module.exports = (request, response, next) => {
  const components = require('../components');
  const renderer   = require('../renderer/webserver');
  const api        = require('../api');

  // Register components
  components.register(require('../components/register'));

  // Add callbacks
  components.template.render((html, placeholder) => {
    renderer.render(html, placeholder);
  });

  components.data.fetch(dataset => {
    return api.get[dataset]();
  });

  next( {
    components,
    renderer,
    api,
  });
}

require('babel-polyfill');

document.addEventListener("DOMContentLoaded", function(event) {

  const component  = require('../middleware/component');
  const paths      = require('../paths');
  const router     = require('cs-router')();
  const components = require('../components')(require('../components/register'));
  const api        = require('../api')();
  const renderer   = require('../renderer/client')();

  // Connect the api, components and renderer together
  components.render((html, placeholder) => {
    renderer.render(html, placeholder);
  });

  components.remove(name => {
    renderer.remove(name);
  });

  components.fetch(dataset => {
    if (api.get[dataset]) {
      return api.get[dataset]();
    } else {
      throw new Error(`Could not find a method ${ dataset } on the api`);
    }
  });

  api.update(dataset => {
    components.update(dataset);
  });

  renderer.ready(name => {
    component.ready(name);
  });
  
  router
    .before(component('navigation', '#menu'), excludes)
    .get(paths.teams, component('teams', '#main'))
    .get(paths.teamCreate, component('teamCreate', '#main'))
    .get(paths.teamEdit, component('teamCreate', '#main'))
    .get(paths.races, component('races', '#main'))
    .get(paths.standings, component('standings', '#main'))
    .get(paths.rules, component('rules', '#main'))
});

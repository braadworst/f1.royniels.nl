require('babel-polyfill');

document.addEventListener("DOMContentLoaded", function(event) {

  const component  = require('../middleware/component');
  const paths      = require('../paths');
  const router     = require('cs-router')();
  const components = require('../components')(require('../components/register'));
  const api        = require('../api')();
  const renderer   = require('../renderer/client')();

  // Load server side cache
  api.setCache(window.__apiCache__);

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
    components.ready(name);
  });

  router
    .before((request, response, next) => next({ renderer, components, api }))
    .get(paths.teams, component('teams', '#main'))
    .get(paths.teamNew, component('teamNew', '#main'))
    .get(paths.teamEdit, component('teamNew', '#main'))
    .get(paths.races, component('races', '#main'))
    .get(paths.standings, component('standings', '#main'))
    .get(paths.rules, component('rules', '#main'))
});

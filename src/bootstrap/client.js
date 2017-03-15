require('babel-polyfill');

document.addEventListener("DOMContentLoaded", function(event) {

  // Set the environment
  window.environment = 'development';

  const settings   = require('../settings/client');
  const component  = require('../middleware/component');
  const paths      = require('../paths');
  const router     = require('cs-router')();
  const api        = require('../api')(settings.apiDomain);
  const renderer   = require('../renderer/client')();

  // Load server side cache
  api.setCache(window.__apiCache__);

  // Setup the components
  const registered = require('../components/register');
  const components = require('../components')(registered, api, renderer, router);

  // Initial ready call for all components on the page
  renderer.init();

  router
    .before((request, response, next) => next({ components }))
    .before(component('navigation', '#menu'))
    .get(paths.teams, component('teams', '#main'))
    .get(paths.teamNew, component('teamNew', '#main'))
    .get(paths.teamEdit, component('teamNew', '#main'))
    .get(paths.races, component('races', '#main'))
    .get(paths.standings, component('standings', '#main'))
    .get(paths.rules, component('rules', '#main'))
});

const paths = require('./paths');

module.exports = function(server) {

  const router = require('cs-router')(server);

  router.get(paths.TEAMS, async function(request, response, next, relay) {
    await relay.components.create('pageSwitcher', 'teams');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.TEAM_DETAIL, async function(request, response, next, relay) {
    await relay.components.create('componentCreate', 'pageSwitcher', 'teamDetail');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.TEAM_CREATE, async function(request, response, next, relay) {
    await relay.components.create('componentCreate', 'pageSwitcher', 'teamCreate');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.RACES, async function(request, response, next, relay) {
    await relay.components.create('componentCreate', 'pageSwitcher', 'races');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.STANDINGS, async function(request, response, next, relay) {
    await relay.components.create('componentCreate', 'pageSwitcher', 'standings');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.RULES, async function(request, response, next, relay) {
    await relay.components.create('componentCreate', 'pageSwitcher', 'rules');
    relay.state.dispatch('menuActive', request.url);
    next();
  });

  return router;
};

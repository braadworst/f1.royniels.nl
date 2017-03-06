const constants        = require('../constants');

module.exports = function(state, server) {

  const router = require('cs-router')(server);

  router.get(constants.url.URL_TEAMS, async function(request, response, next, relay) {
    await relay.state.dispatch('componentCreate', 'pageSwitcher', 'teams');
    await relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(constants.url.URL_TEAM_DETAIL, async function(request, response, next, relay) {
    await relay.state.dispatch('componentCreate', 'pageSwitcher', 'teamDetail');
    await relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(constants.url.URL_TEAM_CREATE, async function(request, response, next, relay) {
    await relay.state.dispatch('componentCreate', 'pageSwitcher', 'teamCreate');
    await relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(constants.url.URL_RACES, async function(request, response, next, relay) {
    await relay.state.dispatch('componentCreate', 'pageSwitcher', 'races');
    await relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(constants.url.URL_STANDINGS, async function(request, response, next, relay) {
    await relay.state.dispatch('componentCreate', 'pageSwitcher', 'standings');
    await relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(constants.url.URL_RULES, async function(request, response, next, relay) {
    await relay.state.dispatch('componentCreate', 'pageSwitcher', 'rules');
    await relay.state.dispatch('menuActive', request.url);
    next();
  });

  return router;
}

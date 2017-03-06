const constants        = require('../constants');

module.exports = function(state, server) {

  const router = require('cs-router')(server);

  router.get(constants.url.URL_TEAMS, (request, response, next, relay) => {
    relay.state.dispatch('componentCreate', 'pageSwitcher', 'teams');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(constants.url.URL_TEAM_DETAIL, (request, response, next, relay) => {
    relay.state.dispatch('componentCreate', 'pageSwitcher', 'teamDetail');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(constants.url.URL_TEAM_CREATE, (request, response, next, relay) => {
    relay.state.dispatch('componentCreate', 'pageSwitcher', 'teamCreate');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(constants.url.URL_RACES, (request, response, next, relay) => {
    relay.state.dispatch('componentCreate', 'pageSwitcher', 'races');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(constants.url.URL_STANDINGS, (request, response, next, relay) => {
    relay.state.dispatch('componentCreate', 'pageSwitcher', 'standings');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(constants.url.URL_RULES, (request, response, next, relay) => {
    relay.state.dispatch('componentCreate', 'pageSwitcher', 'rules');
    relay.state.dispatch('menuActive', request.url);
    next();
  });

  return router;
}

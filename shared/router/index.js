const constants        = require('../constants');
const componentAction  = require('../actions/component');
const menuActiveAction = require('../actions/menuActive');

module.exports = function(server) {

  const router = require('cs-router')(server);

  router.get(constants.url.URL_TEAMS, (request, response, next, relay) => {
    relay.store.dispatch(componentAction.create('componentPageSwitcher', 'componentTeams'));
    relay.store.dispatch(menuActiveAction.active(request.url));
    next();
  });
  router.get(constants.url.URL_TEAM_DETAIL, (request, response, next, relay) => {
    relay.store.dispatch(componentAction.create('componentPageSwitcher', 'componentTeamDetail'));
    relay.store.dispatch(menuActiveAction.active(request.url));
    next();
  });
  router.get(constants.url.URL_TEAM_CREATE, (request, response, next, relay) => {
    relay.store.dispatch(componentAction.create('componentPageSwitcher', 'componentTeamCreate'));
    relay.store.dispatch(menuActiveAction.active(request.url));
    next();
  });
  router.get(constants.url.URL_RACES, (request, response, next, relay) => {
    relay.store.dispatch(componentAction.create('componentPageSwitcher', 'componentRaces'));
    relay.store.dispatch(menuActiveAction.active(request.url));
    next();
  });
  router.get(constants.url.URL_STANDINGS, (request, response, next, relay) => {
    relay.store.dispatch(componentAction.create('componentPageSwitcher', 'componentStandings'));
    relay.store.dispatch(menuActiveAction.active(request.url));
    next();
  });
  router.get(constants.url.URL_RULES, (request, response, next, relay) => {
    relay.store.dispatch(componentAction.create('componentPageSwitcher', 'componentRules'));
    relay.store.dispatch(menuActiveAction.active(request.url));
    next();
  });

  return router;
}

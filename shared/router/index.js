const constants        = require('../constants');
const componentAction  = require('../actions/component');
const menuActiveAction = require('../actions/menuActive');

module.exports = function(server) {

  const router = require('cs-router')(server);

  router.get(constants.url.URL_HOME, (request, response, args) => {
    handle(request, args, 'componentHome');
  });
  router.get(constants.url.URL_LOGIN, (request, response, args) => {
    handle(request, args, 'componentLogin');
  });
  router.get(constants.url.URL_LOGOUT, (request, response, args) => {
    handle(request, args, 'componentLogout');
  });
  router.get(constants.url.URL_REGISTER, (request, response, args) => {
    handle(request, args, 'componentRegister');
  });
  router.get(constants.url.URL_TEAMS, (request, response, args) => {
    handle(request, args, 'componentTeams');
  });
  router.get(constants.url.URL_TEAM_DETAIL, (request, response, args) => {
    handle(request, args, 'componentTeamDetail');
  });
  router.get(constants.url.URL_TEAM_CREATE, (request, response, args) => {
    args.store.dispatch(componentAction.loading('componentPageSwitcher', 'componentTeamCreate'));
    args.store.dispatch(menuActiveAction.active(request.url));
  });
  router.get(constants.url.URL_RACES, (request, response, args) => {
    handle(request, args, 'componentRaces');
  });
  router.get(constants.url.URL_STANDINGS, (request, response, args) => {
    handle(request, args, 'componentStandings');
  });
  router.get(constants.url.URL_RULES, (request, response, args) => {
    handle(request, args, 'componentRules');
  });

  function handle(request, args, component) {
    args.store.dispatch(componentAction.create('componentPageSwitcher', component));
    args.store.dispatch(menuActiveAction.active(request.url));
  }

  return router;
}

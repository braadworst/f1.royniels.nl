const constants = require('../constants');

module.exports = function(server) {

  const router = require('cs-router')(server);

  router.get(constants.url.URL_HOME, handle);
  router.get(constants.url.URL_LOGIN, handle);
  router.get(constants.url.URL_LOGOUT, handle);
  router.get(constants.url.URL_REGISTER, handle);
  router.get(constants.url.URL_TEAMS, handle);
  router.get(constants.url.URL_TEAM_DETAIL, handle);
  router.get(constants.url.URL_TEAM_CREATE, handle);
  router.get(constants.url.URL_RACES, handle);
  router.get(constants.url.URL_STANDINGS, handle);
  router.get(constants.url.URL_RULES, handle);

  function handle(request, response, args, component) {
    args.store.dispatch(componentAction.create('componentPageSwitcher', component));
    args.store.dispatch(menuActiveAction.active(request.params.path));
  }
}

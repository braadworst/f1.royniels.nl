const paths = require('./paths');

module.exports = function(server) {

  const router = require('cs-router')(server);

  router.get(paths.TEAMS, async function(request, response, next, relay) {
    relay.state.dispatch('switcher', 'teams');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.TEAM_CREATE, async function(request, response, next, relay) {
    relay.state.dispatch('switcher', 'teamCreate');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.RACES, async function(request, response, next, relay) {
    relay.state.dispatch('switcher', 'races');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.STANDINGS, async function(request, response, next, relay) {
    relay.state.dispatch('switcher', 'standings');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.RULES, async function(request, response, next, relay) {
    relay.state.dispatch('switcher', 'rules');
    relay.state.dispatch('menuActive', request.url);
    next();
  });

  return router;
};

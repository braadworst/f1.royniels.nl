const paths = require('./paths');

module.exports = function(server) {

  const router = require('cs-router')(server);

  router.get(paths.TEAMS, async function(request, response, next, relay) {
    await relay.components.create('teams');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.TEAM_CREATE, async function(request, response, next, relay) {
    await relay.components.create('teamCreate');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.RACES, async function(request, response, next, relay) {
    await relay.components.create('races');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.STANDINGS, async function(request, response, next, relay) {
    await relay.components.create('standings');
    relay.state.dispatch('menuActive', request.url);
    next();
  });
  router.get(paths.RULES, async function(request, response, next, relay) {
    await relay.components.create('rules');
    relay.state.dispatch('menuActive', request.url);
    next();
  });

  return router;
};

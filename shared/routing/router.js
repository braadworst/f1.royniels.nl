const paths = require('./paths');

module.exports = function(server) {

  const router = require('cs-router')(server);

  router.get(paths.TEAMS, async function(request, response, next, relay) {
    await relay.components.create('switcher', 'teams')
    relay.state.dispatch('menu', request.url);
    next();
  });
  router.get(paths.TEAM_CREATE, async function(request, response, next, relay) {
    await relay.components.create('switcher', 'teamCreate');
    relay.state.dispatch('menu', request.url);
    next();
  });
  router.get(paths.RACES, async function(request, response, next, relay) {
    await relay.components.create('switcher', 'races');
    relay.state.dispatch('menu', request.url);
    next();
  });
  router.get(paths.STANDINGS, async function(request, response, next, relay) {
    await relay.components.create('switcher', 'standings');
    relay.state.dispatch('menu', request.url);
    next();
  });
  router.get(paths.RULES, async function(request, response, next, relay) {
    await relay.components.create('switcher', 'rules');
    relay.state.dispatch('menu', request.url);
    next();
  });
  router.get(paths.RESULTS, async function(request, response, next, relay) {
    await relay.components.create('switcher', 'results');
    relay.state.dispatch('menu', request.url);
    next();
  });

  return router;
};

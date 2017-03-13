const paths = require('./paths');

module.exports = function(server) {

  const router = require('cs-router')(server);

  router.get(paths.TEAMS, (request, response, next, relay) => {
    relay.components.create('switcher', 'teams')
    relay.state.dispatch('menu', request.url);
    relay.state.watch('component', data => {
      console.log(data);
      if (data.name === 'switcher' && data.type === 'loaded') {
        next();
        relay.state.unwatch('component');
      }
    });
  });
  router.get(paths.TEAM_CREATE, (request, response, next, relay) => {
    relay.components.create('switcher', 'teamCreate');
    relay.state.dispatch('menu', request.url);
    relay.state.watch('component', data => {
      if (data.name === 'switcher' && data.type === 'loaded') {
        next();
        relay.state.unwatch('component');
      }
    });
  });
  router.get(paths.RACES, (request, response, next, relay) => {
    relay.components.create('switcher', 'races');
    relay.state.dispatch('menu', request.url);
    relay.state.watch('component', data => {
      if (data.name === 'switcher' && data.type === 'loaded') {
        next();
        relay.state.unwatch('component');
      }
    });
  });
  router.get(paths.STANDINGS, (request, response, next, relay) => {
    relay.components.create('switcher', 'standings');
    relay.state.dispatch('menu', request.url);
    relay.state.watch('component', data => {
      if (data.name === 'switcher' && data.type === 'loaded') {
        next();
        relay.state.unwatch('component');
      }
    });
  });
  router.get(paths.RULES, (request, response, next, relay) => {
    relay.components.create('switcher', 'rules');
    relay.state.dispatch('menu', request.url);
    relay.state.watch('component', data => {
      if (data.name === 'switcher' && data.type === 'loaded') {
        next();
        relay.state.unwatch('component');
      }
    });
  });
  router.get(paths.RESULTS, (request, response, next, relay) => {
    relay.components.create('switcher', 'results');
    relay.state.dispatch('menu', request.url);
    relay.state.watch('component', data => {
      if (data.name === 'switcher' && data.type === 'loaded') {
        next();
        relay.state.unwatch('component');
      }
    });
  });

  return router;
};

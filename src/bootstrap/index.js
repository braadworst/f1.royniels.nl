// Create servers
const webserver = require('./server')(settings.webserver);
const apiserver = require('./server')(settings.apiserver);

// Data mutators middleware
const mutators = {
  predictions : require('../mutators/predictions'),
  standings   : require('../mutators/standings'),
  statistics  : require('../mutators/statistics'),
  teams       : require('../mutators/teams'),
}

// General helper middleware
const relay = {
  logger      : require('../relay/logger'),
  settings    : require('../relay/settings'),
  connections : require('../relay/connections'),
  router      : require('../relay/router')
}

const parsers = {
  decrypt : require('../parsers/decrypt'),
  cookies : require('../parsers/cookies'),
  token   : require('../parsers/token'),
  jsonapi : require('../parsers/jsonapi'),
  body    : require('../parsers/body'),
  url     : require('../parsers/url'),
}

// Validator middleware
const validators = {

}

const excludesAuthentication = [
  '/auth/github',
  '/auth/github/callback',
  '/auth/google',
  '/auth/google/callback',
  '/auth/facebook',
  '/auth/facebook/callback'
];

const excludes = [
  '/login',
  '/logout',
  ...excludesAuthentication
];

const domains = {
  webserver  : 'webserver',
  apiserver  : 'apiserver',
  client     : 'client',
  all        : ['webserver', 'apiserver', 'client'],
  serverside : ['webserver', 'apiserver'],
  spa        : ['webserver', 'client']
}

router
  // Add helpers for middleware to relay object
  .before(domains.webserver, relay.settings('webserver'))
  .before(domains.client, relay.settings('client'))
  .before(domains.spa, relay.router(router))
  .before(domains.apiserver, relay.settings('apiserver'))
  .before(domains.all, relay.logger())
  .before(domains.spa, relay.connections('apiserver'))

  // Add webserver before middleware
  .before(domains.webserver, helpers.statics, excludes)
  .before(domains.webserver, parsers.cookies, excludesAuthentication)
  .before(domains.webserver, parsers.token, excludesAuthentication)
  .before(domains.webserver, parsers.decrypt('token'), excludesAuthentication)
  .before(domains.webserver, publish.userByToken, excludesAuthentication)
  .before(domains.webserver, login.check, excludes)
  .before(domains.webserver, login.redirect)

  // Add apiserver before middleware
  .before(domains.apiserver, validators.request)
  .before(domains.apiserver, parsers.url)
  .before(domains.apiserver, parsers.body)
  .before(domains.apiserver, parsers.jsonapi)
  .before(domains.apiserver, validators.body)

  // Add statistics for server calls
  .before(domains.serverside, .method.statistics)

  .before(['webserver', 'client'], renderer.layout('default'), '/login')
  .before(['webserver', 'client'], publish.single('user'))
  .before(['webserver', 'client'], publish.collection('teamsByUser'))
  .before(['webserver', 'client'], templating.navigation)
  .before(['webserver', 'client'], renderer.render('navigation', '#menu'))

  .get('apiserver', '/init', store.initialize)
  .get('apiserver', '/teams', store.findCollection('teams'))
  .get('apiserver', '/teams/:id', store.findOne('teams'))
  .get('apiserver', '/users', store.findCollection('users'))
  .get('apiserver', '/drivers', store.findCollection('drivers'))
  .get('apiserver', '/drivers/:id', store.findOne('drivers'))
  .get('apiserver', '/chassis', store.findCollection('chassis'))
  .get('apiserver', '/engines', store.findCollection('engines'))
  .get('apiserver', '/circuits', store.findCollection('circuits'))
  .get('apiserver', '/predictions', store.findCollection('predictions'))
  .get('apiserver', '/standings', store.findCollection('standings'))
  .get('apiserver', '/results', store.findCollection('results'))
  .get('apiserver', '/statistics', store.findCollection('statistics'))
  .post('apiserver', '/users', store.saveOne('users'))
  .post('apiserver', '/statistics', store.saveOne('statistics'))
  .post('apiserver', '/teams', store.saveOne('teams'))
  .post('apiserver', '/predictions', store.saveOne('predictions'))
  .post('apiserver', '/results', store.saveTeam)

  .after('apiserver', serializers.jsonapi)
  .after('apiserver', response.json)
  .after('webserver', response.html)
  .noMatch(errors.notFound);

  .component({ id : 'navigation', placeholder : '#menu' })
  .component({ id : 'login', template : 'login' })
  .component({ id : 'teams', subscribe : ['teams'] })
  .component({ id : 'predictions', title : 'Race predications', subscribe : ['user', 'circuits', 'drivers', 'userPredictions'] })
  .component({ id : 'rules', title : 'Game rules' })
  .component({ id : 'standings', subscribe : ['standings'] })
  .component({ id : 'team', subscribe : ['user', 'drivers', 'engines', 'chassis', 'teamById'] })
  .component({ id : 'teams', subscribe : ['teams'] })
  .component({ id : 'results', subscribe : ['user', 'drivers', 'circuits', 'results'] })
  .component({ id : 'statistics', subscribe : ['statistics'] });

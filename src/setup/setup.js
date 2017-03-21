// Data mutators
const mutators = {
  predictions : require('../mutators/predictions'),
  standings   : require('../mutators/standings'),
  statistics  : require('../mutators/statistics'),
  teams       : require('../mutators/teams'),
}

const settings = {
  client    : require('../settings/client'),
  webserver : require('../settings/webserver'),
  apiserver : require('../settings/apiserver'),
}

const renderer = {
  client    : require('../renderer/client'),
  webserver : require('../renderer/webserver'),
}

const logger = {
  client : require('../logger/client'),
  server : require('../logger/serverside'),
}

// Create servers
const webserver = require('./server')(settings.webserver);
const apiserver = require('./server')(settings.apiserver);

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

router
  // Add helpers for middleware to relay object
  .before('webserver', helpers.relay('settings', settings.webserver))
  .before('webserver', helpers.relay('renderer', renderer.webserver))
  .before('client', helpers.relay('settings', settings.client))
  .before('client', helpers.relay('renderer', renderer.client))
  .before(['webserver', 'client'], helpers.relay('router', router))
  .before('apiserver', helpers.relay('settings', settings.apiserver))
  .before(['webserver', 'apiserver', 'client'], helpers.relay('logger', logger))

  .before('webserver', helpers.statics, excludes)
  .before('webserver', store.findOne('user'), excludesAuthentication)
  .before('webserver', login.check, excludes)
  .before('webserver', login.redirect)
  .before('apiserver', validators.request)
  .before('apiserver', parsers.url)
  .before('apiserver', parsers.body)
  .before('apiserver', parsers.jsonapi)
  .before('apiserver', validators.body)
  .before(['webserver', 'apiserver'], .method.statistics)

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

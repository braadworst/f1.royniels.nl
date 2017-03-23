module.exports = (core, middleware) => {


  const webserver  = 'webserver';
  const apiserver  = 'apiserver';
  const client     = 'apiserver';
  const all        = ['webserver', 'apiserver', 'client'];
  const spa        = ['webserver', 'client'];
  const serverside = ['webserver', 'apiserver'];

  road
    .where('apiserver')
      .domain('http://localhost:4444')
    .where('webserver', 'client')
      .domain('http://localhost:4443')
    .where('apiserver', 'webserver', 'client')
      .path('chassis', '/teams')
      .path('circuits', '/standings')
      .path('drivers', '/standings')
      .path('engines', '/standings')
      .path('predictions', '/predictions')
      .path('results', '/standings')
      .path('standings', '/standings')
      .path('statistics', '/statistics')
      .path('teams', '/teams')



      login           : '/',
      logout          : '/logout',
      statistics      : '/statistics',
      teams           : '/teams',
      team            : '/teams/new',
      teamEdit        : '/teams/edit/:id',
      standings       : '/standings',
      rules           : '/rules',
      predictions     : '/predictions',
      results         : '/results',
      githubConsent   : '/auth/github',
      githubToken     : '/auth/github/callback',
      googleConsent   : '/auth/google',
      googleToken     : '/auth/google/callback',
      facebookConsent : '/auth/facebook',
      facebookToken   : '/auth/facebook/callback'

    // Set template


    // Create navigation
    .fetch(webserver, 'teamsByUserId', 'published.user.id')
    .component(webserver, 'navigation')
    .render(webserver, 'navigation', '#menu')

    // Add stats
    .save(serverside, 'methods.statistics')

    // Rendering components client and webserver
    .fetch(spa, '/team/new', 'drivers')
    .fetch(spa, '/team/new', 'engines')
    .fetch(spa, '/team/new', 'chassis')
    .component(spa, '/team/new', 'team')
    .render(spa, '/team/new', '#main')
    .events(client, 'events.team')

    // Api server before middleware
    .before(apiserver, 'validators.request')
    .before(apiserver, 'parsers.url')
    .before(apiserver, 'parsers.body')
    .before(apiserver, 'parsers.jsonapi')
    .before(apiserver, 'validators.body')

    // Get endpoints for the api server
    .get(apiserver, '/init', 'store.initialize', onlyApiserver)
    .get(apiserver, '/teams', 'store.findCollection', 'teams', onlyApiserver)
    .get(apiserver, '/teams/:id', store.findOne('teams'))
    .get(apiserver, '/users', store.findCollection('users'))
    .get(apiserver, '/drivers', store.findCollection('drivers'))
    .get(apiserver, '/drivers/:id', store.findOne('drivers'))
    .get(apiserver, '/chassis', store.findCollection('chassis'))
    .get(apiserver, '/engines', store.findCollection('engines'))
    .get(apiserver, '/circuits', store.findCollection('circuits'))
    .get(apiserver, '/predictions', store.findCollection('predictions'))
    .get(apiserver, '/standings', store.findCollection('standings'))
    .get(apiserver, '/results', store.findCollection('results'))
    .get(apiserver, '/statistics', store.findCollection('statistics'))

    // Post endpoints for the api server
    .post(apiserver, '/users', store.saveOne('users'))
    .post(apiserver, '/statistics', store.saveOne('statistics'))
    .post(apiserver, '/teams', store.saveOne('teams'))
    .post(apiserver, '/predictions', store.saveOne('predictions'))
    .post(apiserver, '/results', store.saveTeam)

    // After calls
    .after(apiserver, 'serializers.jsonapi')
    .after(apiserver, 'response.json')
    .after(webserver, 'response.html')

    // No match
    .noMatch(apiserver, 'errors.notFound');
    .noMatch(webserver, 'errors.notFound');
}

  // .component({ id : 'navigation', placeholder : '#menu' })
  // .component({ id : 'login', template : 'login' })
  // .component({ id : 'teams', subscribe : ['teams'] })
  // .component({ id : 'predictions', title : 'Race predications', subscribe : ['user', 'circuits', 'drivers', 'userPredictions'] })
  // .component({ id : 'rules', title : 'Game rules' })
  // .component({ id : 'standings', subscribe : ['standings'] })
  // .component({ id : 'team', subscribe : ['user', 'drivers', 'engines', 'chassis', 'teamById'] })
  // .component({ id : 'teams', subscribe : ['teams'] })
  // .component({ id : 'results', subscribe : ['user', 'drivers', 'circuits', 'results'] })
  // .component({ id : 'statistics', subscribe : ['statistics'] });

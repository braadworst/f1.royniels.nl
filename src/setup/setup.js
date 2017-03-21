// Middleware
const statics           = require('../middleware/statics');
const loggedInUser      = require('../middleware/loggedInUser');
const loginCheck        = require('../middleware/loginCheck');
const loginProcess      = require('../middleware/loginProcess');
const template          = require('../middleware/template');
const component         = require('../middleware/component');
const componentId       = require('../middleware/componentId');
const logout            = require('../middleware/logout');
const htmlResponse      = require('../middleware/htmlResponse');
const errors            = require('../middleware/errors');
const setupWebserver    = require('../middleware/setupWebserver');
const loginRedirect     = require('../middleware/loginRedirect');
const statistics        = require('../middleware/statistics');
const errors            = require('../middleware/errors');
const setupDatabase     = require('../middleware/setupDatabase');
const jsonResponse      = require('../middleware/jsonResponse');
const findData          = require('../middleware/findData');
const findStandings     = require('../middleware/findStandings');
const findStatistics    = require('../middleware/findStatistics');
const findTeams         = require('../middleware/findTeams');
const saveData          = require('../middleware/saveData');
const urlParser         = require('../middleware/urlParser');
const jsonApiParser     = require('../middleware/jsonApiParser');
const jsonApiSerializer = require('../middleware/jsonApiSerializer');
const bodyValidator     = require('../middleware/bodyValidator');
const requestValidator  = require('../middleware/requestValidator');
const bodyParser        = require('../middleware/bodyParser');
const saveTeam          = require('../middleware/saveTeam');
const saveResult        = require('../middleware/saveResult');
const savePrediction    = require('../middleware/savePrediction');

// Settings
const settings          = require('../settings');

// Create servers
const webserver         = require('./server')(settings.webserver);
const apiserver         = require('./server')(settings.apiserver);

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
  .before('webserver', logger)
  .before('webserver', relay)
  .before('webserver', statics, excludes)
  .before('webserver', loggerInUser, excludesAuthentication)
  .before('webserver', logginCheck, excludes)
  .before('webserver', statistics)
  .before('apiserver', relay)
  .before('apiserver', logger)
  .before('apiserver', statistics)
  .before('apiserver', requestValidator)
  .before('apiserver', urlParser)
  .before('apiserver', bodyParser)
  .before('apiserver', jsonApiParser)
  .before('apiserver', bodyValidator)
  .get('apiserver', '/init', setupDatabase)
  .get('apiserver', '/teams', findTeams)
  .get('apiserver', '/teams/:id', findTeams)
  .get('apiserver', '/users', findData)
  .get('apiserver', '/drivers', findData)
  .get('apiserver', '/drivers/:id', findData)
  .get('apiserver', '/chassis', findData)
  .get('apiserver', '/engines', findData)
  .get('apiserver', '/circuits', findData)
  .get('apiserver', '/predictions', findData)
  .get('apiserver', '/standings', findStandings)
  .get('apiserver', '/results', findData)
  .get('apiserver', '/statistics', findStatistics)
  .post('apiserver', '/users', saveData)
  .post('apiserver', '/statistics', saveData)
  .post('apiserver', '/teams', saveTeam)
  .post('apiserver', '/predictions', savePrediction)
  .post'apiserver', ('/results', saveResult)
  .after('apiserver', jsonApiSerializer)
  .after('apiserver', jsonResponse)
  .after('webserver', htmlResponse)
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

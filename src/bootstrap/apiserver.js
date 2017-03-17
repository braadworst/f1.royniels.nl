const spdy              = require('spdy');
const logger            = require('minilog')('apiserver');
const settings          = require('../settings')('apiserver');
const database          = require('../store')(settings.databaseName);

const errors            = require('../middleware/errors');
const setupDatabase     = require('../middleware/setupDatabase');
const jsonResponse      = require('../middleware/jsonResponse');
const findData          = require('../middleware/findData');
const findStandings     = require('../middleware/findStandings');
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

// Enable logger
require('minilog').enable();

// Create HTTP2 server
let server = spdy.createServer(settings.certs);

const router = require('cs-router')(server);

router
  .before((request, response, next) => { logger.info(request.url); next() })
  .before((request, response, next) => next({ database, settings }))
  // .before(requestValidator)
  .before(urlParser)
  .before(bodyParser)
  .before(jsonApiParser)
  .before(bodyValidator)
  .get('/init', setupDatabase)
  .get('/teams', findTeams)
  .get('/teams/:id', findTeams)
  .get('/users', findData)
  .get('/drivers', findData)
  .get('/drivers/:id', findData)
  .get('/chassis', findData)
  .get('/engines', findData)
  .get('/circuits', findData)
  .get('/predictions', findData)
  .get('/standings', findStandings)
  .get('/results', findData)
  .post('/users', saveData)
  .post('/teams', saveTeam)
  .post('/predictions', savePrediction)
  .post('/results', saveResult)
  .after(jsonApiSerializer)
  .after(jsonResponse)
  .noMatch(errors.notFound);

server.listen(settings.port, function() {
  logger.info('Server listening on port: ' + settings.port);
});

const http              = require('http');
const logger            = require('minilog')('apiserver');
const settings          = require('../settings');
const database          = require('../store')(settings.databaseName);

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

require('minilog').enable();

let server = http.createServer();

const router = require('cs-router')(server, settings.webserver.uri);

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
  .get('/statistics', findStatistics)
  .post('/users', saveData)
  .post('/statistics', saveData)
  .post('/teams', saveTeam)
  .post('/predictions', savePrediction)
  .post('/results', saveResult)
  .after(jsonApiSerializer)
  .after(jsonResponse)
  .noMatch(errors.notFound);

server.listen(settings.apiserver.port, settings.apiserver.domain, function() {
  logger.info('apiserver listening on port: ' + settings.apiserver.domain + ':' + settings.apiserver.port);
});

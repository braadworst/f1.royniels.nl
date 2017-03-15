const spdy              = require('spdy');
const logger            = require('minilog')('apiserver');
const settings          = require('../settings')('apiserver');
const database          = require('../store')(settings.databaseName);

const errors            = require('../middleware/errors');
const setupDatabase     = require('../middleware/setupDatabase');
const jsonResponse      = require('../middleware/jsonResponse');
const findData          = require('../middleware/findData');
const saveData          = require('../middleware/saveData');
const urlParser         = require('../middleware/urlParser');
const jsonApiParser     = require('../middleware/jsonApiParser');
const jsonApiSerializer = require('../middleware/jsonApiSerializer');
const bodyValidator     = require('../middleware/bodyValidator');
const requestValidator  = require('../middleware/requestValidator');
const bodyParser        = require('../middleware/bodyParser');

// Enable logger
require('minilog').enable();

// Create HTTP2 server
let server = spdy.createServer(settings.certs);

const router = require('cs-router')(server);

router
  .before((request, response, next) => { logger.info(request.url); next() })
  .before((request, response, next) => next({ database }))
  // .before(requestValidator)
  .before(urlParser)
  .before(bodyParser)
  .before(jsonApiParser)
  .before(bodyValidator)
  .get('/init', setupDatabase)
  .get('/teams', findData)
  .get('/teams/:id', findData)
  .get('/users', findData)
  .get('/drivers', findData)
  .get('/drivers/:id', findData)
  .get('/chassis', findData)
  .get('/engines', findData)
  .get('/circuits', findData)
  .get('/predictions', findData)
  .get('/points', findData)
  .post('/users', saveData)
  .post('/teams', saveData)
  .post('/predictions', saveData)
  .post('/results', saveData)
  .after(jsonApiSerializer)
  .after(jsonResponse)
  .noMatch(errors.notFound);

server.listen(settings.port, function() {
  logger.info('Server listening on port: ' + settings.port);
});

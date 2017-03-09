const bodyParser       = require('body-parser');
const getHandler       = require('./handlers/get');
const postHandler      = require('./handlers/post');
const createHandler    = require('./handlers/create');
const responseHandler  = require('./handlers/response');
const errorHandler     = require('./handlers/error');
const bodyValidator    = require('./validators/body');
const requestValidator = require('./validators/request');
const query            = require('../../shared/api/query');
const serialize        = require('./serializer/serialize');
const deserialize      = require('./serializer/deserialize');

function internalError(response, error) {
  console.log(errors);
  response.writeHead(500, {'Content-Type' : 'text/plain'});
  response.end('Internal server error');
}

module.exports = function(server, database) {
  const router = require('cs-router')(server);

  router
    .before((request, response, next) => next({ database }))
    .before(requestValidator)
    .before(bodyParser.json())
    .before(bodyValidator)
    .before(deserialize)
    .get('/init', createHandler)
    .get('/drivers', getHandler)
    .get('/teams', getHandler)
    .get('/users', getHandler)
    .get('/drivers', getHandler)
    .get('/chassis', getHandler)
    .get('/predictions', getHandler)
    .get('/points', getHandler)
    .post('/users', postHandler)
    .post('/teams', postHandler)
    .post('/predictions', postHandler)
    .post('/results', postHandler)
    .after(serialize)
    .after(responseHandler)
    .noMatch(errorHandler.notFound);

  // router.get('/teams', async function(request, response) {
  //   try {
  //     let teams   = await database.get(schemas.teams);
  //     let drivers = await database.get(schemas.drivers);
  //     let engines = await database.get(schemas.engines);
  //     let chassis = await database.get(schemas.chassis);
  //
  //     // map all the information to the teams object
  //     teams = teams.map(team => {
  //       team.engine       = engines.filter(record => record.id === team.engineId).pop();
  //       team.chassis      = chassis.filter(record => record.id === team.chassisId).pop();
  //       team.firstDriver  = drivers.filter(record => record.id === team.firstDriverId).pop();
  //       team.secondDriver = drivers.filter(record => record.id === team.secondDriverId).pop();
  //
  //       return team;
  //     });
  //
  //     response.end(JSON.stringify(teams));
  //   } catch (error) {
  //     internalError(response, error);
  //   }
  // });
}

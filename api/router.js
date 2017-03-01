const drivers     = require('../shared/schemas/drivers');
const engines     = require('../shared/schemas/engines');
const chassis     = require('../shared/schemas/chassis');
const circuits    = require('../shared/schemas/circuits');
const teams       = require('../shared/schemas/teams');
const Ajv         = require('ajv');
const ajv         = new Ajv({ coerceTypes : true });

module.exports = function(server, database) {
  const router = require('cs-router')(server);

  router.before((request, response) => {
    response.setHeader('Content-Type', 'application/vnd.api+json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    // TODO add overflow limit
    console.log(request.method, request.url);
  });

  router.get('/api/drivers', async function(request, response) {
    const records = await database.selectAll(drivers);
    response.end(JSON.stringify(records));
  });

  router.get('/api/chassis', async function(request, response) {
    const records = await database.selectAll(chassis);
    response.end(JSON.stringify(records));
  });

  router.get('/api/engines', async function(request, response) {
    const records = await database.selectAll(engines);
    response.end(JSON.stringify(records));
  });

  router.get('/api/circuits', async function(request, response) {
    const records = await database.selectAll(circuits);
    response.end(JSON.stringify(records));
  });

  router.post('/api/teams', (request, response) => {
    let body = '';
    request
      .on('data', data => body += data)
      .on('end', async function () {
        try {
          body = JSON.parse(body);
          console.log(body);
          if (ajv.validate(teams, body)) {
            console.log('valid');
            const result = await database.insert(teams, [body]);
            response.end('success');
          } else {
            console.log(ajv.errors);
            response.end('invalid');
          }

          response.end('Yes!');
        } catch (error) {
          console.log(error);
          response.end('errors');
        }
    });
    response.end('bla');
  });
}

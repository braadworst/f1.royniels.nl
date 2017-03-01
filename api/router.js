const drivers  = require('../shared/schemas/drivers');
const engines  = require('../shared/schemas/engines');
const chassis  = require('../shared/schemas/chassis');
const circuits = require('../shared/schemas/circuits');

module.exports = function(server, database) {
  const router = require('cs-router')(server);

  router.before((request, response) => {
    response.setHeader('Content-Type', 'application/vnd.api+json');
    response.setHeader('Access-Control-Allow-Origin', '*');
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
}

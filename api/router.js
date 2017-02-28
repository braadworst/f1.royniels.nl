const tables = require('./store/tables');

module.exports = function(server, database) {
  const router = require('cs-router')(server);

  router.get('/api/drivers', async function(request, response) {
    const records = await database.selectAll(tables.drivers);
    response.setHeader('Content-Type', 'application/vnd.api+json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.end(JSON.stringify(records));
  });

  router.get('/api/chassis', async function(request, response) {
    const records = await database.selectAll(tables.chassis);
    response.setHeader('Content-Type', 'application/vnd.api+json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.end(JSON.stringify(records));
  });

  router.get('/api/engines', async function(request, response) {
    const records = await database.selectAll(tables.engines);
    response.setHeader('Content-Type', 'application/vnd.api+json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.end(JSON.stringify(records));
  });
}

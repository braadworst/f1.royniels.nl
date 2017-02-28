const tables = require('./store/tables');

module.exports = function(server, database) {
  const router = require('cs-router')(server);

  router.get('/api/drivers', async function(request, response) {
    const drivers = await database.selectAll(tables.drivers);
    response.setHeader('Content-Type', 'application/vnd.api+json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.end(JSON.stringify(drivers));
  });
}

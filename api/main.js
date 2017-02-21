const settings = require('package-settings');
const database = require('./store')(settings);
const tables   = require('./store/tables');
const datasets = require('./store/datasets');
const spdy     = require('spdy');

// Create HTTP2 server
let server = spdy.createServer(settings.apiserver.certs);

// Add static(ish) data to the database
// Add function serialize to ensure everything is ran in order
// This stuff might run at all time, nothing from the client will influence this
(async function() {
  try {
    await database.drop(tables.drivers);
    await database.create(tables.drivers);
    await database.insert(tables.drivers, datasets.drivers);

    await database.drop(tables.engines);
    await database.create(tables.engines);
    await database.insert(tables.engines, datasets.engines);

    await database.drop(tables.chassis);
    await database.create(tables.chassis);
    await database.insert(tables.chassis, datasets.chassis);

    await database.drop(tables.circuits);
    await database.create(tables.circuits);
    await database.insert(tables.circuits, datasets.circuits);
  } catch (error) {
    throw new Error(error);
  }
}());

server.listen(settings.apiserver.port, function() {
  console.log('Server listening on port: ' + settings.apiserver.port);
});

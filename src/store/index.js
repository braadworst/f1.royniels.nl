const sqlite = require('sqlite3');
const logger = require('minilog')('store');
require('minilog').enable();

module.exports = function(databaseName) {

  // Run the biatch
  const database = new sqlite.Database(databaseName);

  // Events
  database.on('error', error => { throw new Error(error); });
  database.on('open', () => logger.info('database opened and ready to use'));

  return {
    create    : require('./queries/create')(database),
    insert    : require('./queries/insert')(database),
    drop      : require('./queries/drop')(database),
    find      : require('./queries/find')(database),
    update    : require('./queries/update')(database),
  };
}

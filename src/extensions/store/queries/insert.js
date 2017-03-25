const logger = require('minilog')('store:insert');
const fill   = require('lodash/fill');
require('minilog').enable();

module.exports = function(database) {
  return function(schema, record) {
    return new Promise((resolve, reject) => {

      const placeholders = fill(Array(Object.keys(record).length), '?').join(', ');

      const query = `INSERT INTO ${ schema.title } (${ Object.keys(record) }) VALUES (${ placeholders })`;
      logger.info(query);

      database.run(
        query,
        Object.values(record),
        function(error) {
          if (error) {
            reject(error);
          } else {
            record.id = this.lastID; // this, sigh...
            resolve(record);
          }
        }
      );
    });
  }
}

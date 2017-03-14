const logger = require('minilog')('store:update');
const fill   = require('lodash/fill');
require('minilog').enable();

module.exports = function(database) {
  return function(schema, record) {
    return new Promise((resolve, reject) => {
      const id = [record.id];
      delete record.id;
      const fields = Object.keys(record).map(key => key + ' = ?').join(', ');

      const query = `UPDATE ${ schema.title } SET ${ fields } WHERE id = ?`;
      logger.info(query);

      database.run(
        query,
        [...Object.values(record), ...id],
        (error) => {
          if (error) {
            reject(error);
          } else {
            record.id = id;
            resolve(record);
          }
        }
      );
    });
  }
}

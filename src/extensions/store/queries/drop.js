const logger = require('minilog')('store:drop');
require('minilog').enable();

module.exports = function(database) {
  return function(table) {
    return new Promise((resolve, reject) => {

      const query = `DROP TABLE IF EXISTS ${ table.title }`;
      logger.info(query);

      database.run(
        query,
        [],
        error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

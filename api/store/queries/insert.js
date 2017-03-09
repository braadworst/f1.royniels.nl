const fill = require('lodash/fill');

module.exports = function(database) {
  return function(schema, record) {
    return new Promise((resolve, reject) => {

      const placeholders = fill(Array(Object.keys(record).length), '?').join(', ');

      database.run(
        `INSERT INTO ${ schema.title } (${ Object.keys(record) }) VALUES (${ placeholders })`,
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

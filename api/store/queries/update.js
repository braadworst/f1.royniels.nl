const fill = require('lodash/fill');

module.exports = function(database) {
  return function(schema, record) {
    return new Promise((resolve, reject) => {
      const id = [record.id];
      delete record.id;
      const fields = Object.keys(record).map(key => key + ' = ?').join(', ');
      database.run(
        `UPDATE ${ schema.title } SET ${ fields } WHERE id = ?`,
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

module.exports = function(database) {
  return function(table, columnName, value) {
    return new Promise((resolve, reject) => {
      database.all(
        `SELECT * FROM ${ table.title } WHERE ${ columnName } = $value LIMIT 1`,
        { $value : value },
        (error, records) => {
          if (error) {
            reject(error);
          } else {
            if (Array.isArray(records) && records.length) {
              resolve(records);
            } else {
              resolve(false);
            }
          }
        }
      );
    });
  }
}

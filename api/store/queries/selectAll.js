module.exports = function(database) {
  return function(table) {
    return new Promise((resolve, reject) => {
      database.all(
        `SELECT * FROM ${ table.name }`,
        [],
        (error, records) => {
          if (error) {
            reject(error);
          } else {
            console.log('selected all records from: ' + table.name);
            resolve(records);
          }
        }
      );
    });
  }
}

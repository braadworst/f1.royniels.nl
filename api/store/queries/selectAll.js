module.exports = function(database) {
  return function(table) {
    table = JSON.parse(table);
    return new Promise((resolve, reject) => {
      database.all(
        `SELECT * FROM ${ table.title }`,
        [],
        (error, records) => {
          if (error) {
            reject(error);
          } else {
            console.log('selected all records from: ' + table.title);
            resolve(records);
          }
        }
      );
    });
  }
}

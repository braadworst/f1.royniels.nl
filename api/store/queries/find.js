module.exports = function(database) {
  return function(table) {
    return new Promise((resolve, reject) => {
      database.all(
        `SELECT * FROM ${ table.title }`,
        [],
        (error, records) => {
          if (error) {
            reject(error);
          } else {
            resolve(records);
          }
        }
      );
    });
  }
}

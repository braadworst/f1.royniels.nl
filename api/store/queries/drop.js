module.exports = function(database) {
  return function(table) {
    return new Promise((resolve, reject) => {
      database.run(
        `DROP TABLE IF EXISTS ${ table.name }`,
        [],
        error => {
          if (error) {
            reject(error);
          } else {
            console.log('removed: ' + table.name);
            resolve();
          }
        }
      );
    });
  }
}

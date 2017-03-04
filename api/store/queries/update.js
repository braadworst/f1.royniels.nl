module.exports = function(database) {
  return function(table, columnName, value, id) {
    console.log('update');
    return new Promise((resolve, reject) => {
      database.all(
        `UPDATE ${ table.title } SET ${ columnName } = $value WHERE id = $id`,
        { $value : value, $id : id },
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

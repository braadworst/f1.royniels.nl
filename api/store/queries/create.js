module.exports = function(database) {
  return function(table) {
    return new Promise((resolve, reject) => {
      const fields = table.fields.map(type => {
        return `${ type.field } ${ type.type } ${ type.primary ? 'primary key' : ''}`;
      }).join(', ');

      database.run(
        `CREATE TABLE ${ table.name } (${fields})`,
        [],
        error => {
          if (error) {
            reject(error);
          } else {
            console.log('created: ' + table.name);
            resolve();
          }
        }
      );
    });
  }
}

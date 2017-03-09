module.exports = function(database) {
  return function(schema, options) {
    return new Promise((resolve, reject) => {

      let query = `SELECT * FROM ${ schema.title }`;
      console.log(options);
      if (options.sort) {
        const querySort = options.sort.map(field => {
          if (field[0] === '-') {
            return field.slice(1) + ' DESC';
          }
          return field + ' ASC';
        });
        query += ` ORDER BY ${ querySort.join(', ') }`;
      }

      console.log(query);

      database.all(
        query,
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

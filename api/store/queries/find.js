module.exports = function(database) {
  return function(schema, options) {
    return new Promise((resolve, reject) => {

      console.log(options);

      let placeholders = {},
          table        = schema.title,
          where        = '',
          fields       = '*',
          sort         = '',
          pagination   = '';

      if (options.filter) {

      }

      if (options.pagination) {
        let offset;
        let limit;
        options.pagination.map(row => {
          if (row.field === 'number') {
            offset = row.value;
          }
          if (row.field === 'size') {
            limit = row.value;
          }
        });
        pagination = `LIMIT ${ limit } OFFSET ${ (offset - 1) * limit }`;
      }

      if (options.sort) {
        const sorting = options.sort.map(field => {
          if (field[0] === '-') {
            return field.slice(1) + ' DESC';
          }
          return field + ' ASC';
        });
        sort = `ORDER BY ${ sorting.join(', ') }`;
      }

      const query = `SELECT ${ fields } FROM ${ table } ${ where } ${ sort } ${ pagination }`;

      console.log(query);

      database.all(
        query,
        placeholders,
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

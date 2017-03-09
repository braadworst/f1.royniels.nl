module.exports = function(database) {
  return function(schema, options) {
    return new Promise((resolve, reject) => {

      let placeholders = [],
          table        = schema.title,
          where        = '',
          fields       = '*',
          sort         = '',
          pagination   = '';

      if (options.fields) {
        // We don't have joins so we ignore all non current resource related fields
        let resource = options.fields
          .filter(field => field.resource === table)
          .pop();
        fields = resource.fields.join(', ');
      }

      if (options.filters) {
        let fields   = options.filters.map(row => row.field + ' = ?');
        placeholders = options.filters.map(row => row.value );
        where = `WHERE ${ fields.join('AND') }`;
      }

      if (options.pagination) {
        let offset;
        let limit;
        options.pagination.forEach(row => {
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

      database.all(
        `SELECT ${ fields } FROM ${ table } ${ where } ${ sort } ${ pagination }`,
        placeholders,
        (error, records) => {
          if (error) {
            reject(error);
          } else {
            if (records.length === 1) {
              resolve(records.pop());
            } else {
              resolve(records);
            }
          }
        }
      );
    });
  }
}

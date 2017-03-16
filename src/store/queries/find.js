const logger = require('minilog')('store:find');
require('minilog').enable();

module.exports = function(database) {
  return function(schema, options = {}) {
    return new Promise((resolve, reject) => {

      let placeholders = [],
          table        = schema.title,
          where        = '',
          fields       = '*',
          sort         = '',
          joins        = '',
          pagination   = '';

      if (options.fields && Array.isArray(options.fields) && options.fields.length > 0) {
        fields = options.fields.map(field => {
          return `${ field } AS '${ field.split('.').join('-') }'`;
        }).join(', ');
      }

      if (options.joins && Array.isArray(options.joins) && options.joins.length > 0) {
        joins = options.joins.map(join => {
          const alias = join.alias ? `AS ${ join.alias }` : '';
          return `JOIN ${ join.table } ${ alias } ON ${ join.fieldA } = ${ join.fieldB }`;
        }).join(' ');
      }

      if (options.filters && Array.isArray(options.filters) && options.filters.length > 0) {
        let fields   = options.filters.map(row => row.field + ' = ?');
        placeholders = options.filters.map(row => row.value );
        where = `WHERE ${ fields.join(' AND ') }`;
      }

      if (options.pagination && options.pagination.size && options.pagination.number) {
        const limit  = options.pagination.size;
        const offset = options.pagination.number;
        pagination = `LIMIT ${ limit } OFFSET ${ (offset - 1) * limit }`;
      }

      if (options.sort && Array.isArray(options.sort) && options.sort.length > 0) {
        const sorting = options.sort.map(field => {
          if (field[0] === '-') {
            return field.slice(1) + ' DESC';
          }
          return field + ' ASC';
        });
        sort = `ORDER BY ${ sorting.join(', ') }`;
      }

      const query = `SELECT ${ fields } FROM ${ table } ${ joins } ${ where } ${ sort } ${ pagination }`;
      logger.info(query);

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

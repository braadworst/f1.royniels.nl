module.exports = function() {

  let exposed, filters = [], fieldsets = [], sorts = [], pagination = [];

  exposed = {
    pagination(name, value) {
      pagination.push({
        key   : `page[${ name }]`,
        value : value
      });
      return exposed;
    },
    filter(name, value) {
      if (!name || !value) {
        throw new Error('Please provide both name and value for the query filter');
      }
      filters.push({
        key   : `filter[${name}]`,
        value : value
      });
      return exposed;
    },
    fields(resource, ...fields) {
      if (!resource) {
        throw new Error('Please add the resource for the fields you want to get');
      }
      if (fields.length) {
        fieldsets.push({
          key   : `fields[${ resource }]`,
          value : fields.join(',')
        });
      }
      return exposed;
    },
    sort(...fields) {
      if(!fields.length) {
        throw new Error('Please provide fields you want to sort on');
      }
      sorts.push({
        key   : 'sort',
        value : fields.join(',')
      });
      return exposed;
    },
    serialize() {
      return [sorts, pagination, filters, fieldsets]
        .reduce((setOutput, set) => {
          return setOutput + set.reduce((rowOutput, row) => {
            return rowOutput + `${ row.key }=${ row.value }&`;
          }, '');
        }, '');
    },
    parse(serialized) {
      if (!serialized) {
        return false;
      }
      const parsed = serialized
        .split('&')
        .filter(row => row)
        .map(row => {
          row = row.split('=');
          return {
            key : row.shift(),
            values : row.shift()
          };
        })
        .map(row => {
          row.values = row.values.split(',')
          return row;
        });

      // Add the options to the current function, so you can manipulate it again
      parsed.forEach(row => {
        const key  = row.key.split('[').shift();
        const name = row.key.split('[').pop().split(']').shift();

        switch (key) {
          case 'filter' :
            exposed.filter(name, ...row.values);
            break;
          case 'fields' :
            exposed.fields(name, ...row.values);
            break;
          case 'page' :
            exposed.pagination(name, ...row.values);
            break;
          case 'sort' :
            exposed.sort(...row.values);
            break;
        }
      });
    },
    toObject() {
      let output = {};

      if (sorts.length) {
        output.sort = sorts.reduce((output, row) => [...output, ...row.value.split(',')], []);
      }

      if (pagination.length) {
        output.pagination = pagination.map(page => {
          return {
            field : page.key.split('[').pop().split(']').shift(),
            value : page.value
          };
        })
      }

      if (filters.length) {
        output.filters = filters.map(filter => {
          return {
            field : filter.key.split('[').pop().split(']').shift(),
            value : filter.value
          };
        })
      }

      if (fieldsets.length) {
        output.fields = fieldsets.map(field => {
          return {
            resource : field.key.split('[').pop().split(']').shift(),
            fields   : field.value.split(',')
          };
        })
      }

      return output;
    }
  }

  return exposed;
};

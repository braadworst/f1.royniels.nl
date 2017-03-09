module.exports = (function() {

  let exposed, filters = [], fieldsets = [], sorts = [], includes = [], pages = [];

  exposed = {
    page(number = 1, size = 50) {
      pages[0] = {
        key   : 'page[number]',
        value : number
      };
      pages[1] = {
        key   : 'page[size]',
        value : size
      };
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
    include(...resouces) {
      if (!resources.length) {
        throw new Error('Please provide resource names if you want to include resources');
      }
      includes.push({
        key   : 'include',
        value : resources.join(',')
      });
    },
    serialize() {
      return [sorts, includes, pages, filters, fieldsets]
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
      return serialized
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
    }
  }


  return exposed;
}());

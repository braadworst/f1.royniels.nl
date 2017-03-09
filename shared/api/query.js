module.exports = function() {

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
      sort.push({
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
    toString() {
      return
        parametersToString(fieldsets) +
        parametersToString(sorts) +
        parametersToString(includes) +
        parametersToString(pages) +
        parametersToString(filters);
    }
  }

  function parametersToString(parameters) {
    return parameters.reduce(row => `${ row.key }=${ row.value }&`);
  }

  return exposed;
}

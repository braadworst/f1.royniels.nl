const url = require('url');

module.exports = (request, response, next, relay) => {
  const parsed = url.parse(request.url);
  const query  = parse(parsed.query);
  let type     = parsed.pathname.split('/').slice(1)
  type         = type.shift();

  if (request.parameters && request.parameters.id) {
    query.filters.push({ field : 'id', value : request.parameters.id });
  }

  next({ type, options : query });

  function parse(query) {
    let output = {
      filters    : [],
      pagination : {},
      fields     : [],
      sort       : []
    };

    if (!query) {
      return { filters : [] };
    }

    query
      .split('&')
      .filter(row => row)
      .map(row => {
        let value = row.split('=').pop().split(',');
        if (value.length === 1) {
          value = value.pop();
        }
        return {
          key   : row.split('=').shift(),
          value
        }
      })
      .map(row => {
        if (row.key === 'sort') {
          output.sort = Array.isArray(row.value) ? row.value : [row.value];
        } else if (row.key.indexOf('fields') > -1) {
          output.fields = Array.isArray(row.value) ? row.value : [row.value];
        } else if (row.key.indexOf('page') > -1) {
          let key = row.key.split('[').pop().split(']').shift();
          output.pagination[key] = parseInt(row.value);
        } else if (row.key.indexOf('filter') > -1) {
          let key = row.key.split('[').pop().split(']').shift();
          output.filters.push({ field : key, value : row.value });
        }
      });

    return output;
  }
}

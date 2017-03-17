const url = require('url');

module.exports = (request, response, next, relay) => {
  const parsed = url.parse(decodeURIComponent(request.url));
  const query  = parse(parsed.query);
  let type     = parsed.pathname.split('/').slice(1)
  type         = type.shift();

  if (request.parameters && request.parameters.id) {
    query.filters.push({ field : type + '.id', value : request.parameters.id });
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
        if (row.indexOf('fields') > -1) {
          const table = row.split(']').shift().split('[').pop();
          const fields = row.split('=').pop().split(',').map(field => `${ table }.${ field }`);
          output.fields = [...output.fields, ...fields];
        } else if (row.indexOf('filter') > -1) {
          const field = row.split(']').shift().split('[').pop();
          const value = row.split('=').pop();
          output.filters.push({ field, value });
        } else if (row.indexOf('sort') > -1) {
          output.sort = row.split('=').pop().split(',');
        } else if (row.indexOf('page') > -1) {
          const name = row.split(']').shift().split('[').pop();
          output.pagination[name] = parseInt(row.split('=').pop());
        }
      });

    return output;
  }
}

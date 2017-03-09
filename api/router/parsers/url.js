const url    = require('url');
const query  = require('../../../shared/api/query')();

module.exports = (request, response, next, relay) => {
  const parsedUrl = url.parse(request.url);
  const path      = parsedUrl.pathname.split('/').slice(1);
  const type      = path.shift();

  query.parse(path.query);

  if (request.parameters && request.parameters.id) {
    query.filter('id', request.parameters.id);
  }

  next({ type, options : query.toObject() });
}

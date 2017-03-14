const url = require('url');

module.exports = (request, response, next, relay) => {
  const query     = require('../../../shared/api/query')();
  const parsedUrl = url.parse(request.url);
  const path      = parsedUrl.pathname.split('/').slice(1);
  const type      = path.shift();

  query.parse(parsedUrl.query);

  if (request.parameters && request.parameters.id) {
    query.filter('id', request.parameters.id);
  }

  next({ type, options : query.toObject() });
}

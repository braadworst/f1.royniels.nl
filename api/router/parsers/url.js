const url    = require('url');
const query  = require('../../../shared/api/query');

module.exports = (request, response, next, relay) => {
  const parsedUrl = url.parse(request.url);
  const path      = parsedUrl.pathname.split('/').slice(1);
  const type      = path.shift();
  const id        = path.length ? path.shift() : false;
  const options   = {};
  next({ type, id, options });
}

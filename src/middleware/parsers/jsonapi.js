const jsonapi = require('../../../shared/api/jsonapi');

module.exports = (request, response, next, relay) => {
  next({ post : jsonapi.parse(request.body) });
}

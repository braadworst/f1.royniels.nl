const errors    = require('./errors');
const mediaType = 'application/vnd.api+json';

module.exports = function(request, response, next) {

  const contentType = request.headers['content-type'];
  const accept      = request.headers['accept'] ? request.headers['accept'].split(',').filter(row => row.indexOf(mediaType) > -1) : [];

  // See http://jsonapi.org/format/#content-negotiation for specs JSON API
  if (!contentType) {
    errors.badRequest(request, response);
    return;
  } else if (contentType.indexOf(';') > -1) {
    errors.unsupportedMediaType(request, response);
    return;
  } else if (accept.length) {
    if (accept.filter(row => row.indexOf(';') === -1).length === 0) {
      errors.notAcceptable(request, response);
      return;
    }
  }
  next();
}

const mediaType = 'application/vnd.api+json';
const logger    = require('minilog')('middelware:requestValidator');
require('minilog').enable();

module.exports = {
  notFound(request, response) {
    logger.error(request.url + ' not found');
    response.writeHead(404, { 'Content-Type' : mediaType });
    response.end(JSON.stringify({
      error : 'Page not found'
    }));
  },
  badRequest(request, response) {
    logger.error(request.url + ' bad request');
    response.writeHead(400, { 'Content-Type' : mediaType });
    response.end(JSON.stringify({
      error : `Bad request, did you set the 'Content-Type' to '${ mediaType }'`
    }));
  },
  unsupportedMediaType(request, response) {
    logger.error(request.url + ' unsupported media type');
    response.writeHead(415, { 'Content-Type' : mediaType });
    response.end(JSON.stringify({
      error : `It is not allowed to specify media type parameters in the 'Content-Type' header`
    }));
  },
  notAcceptable(request, response) {
    logger.error(request.url + ' not acceptable');
    response.writeHead(406, { 'Content-Type' : mediaType });
    response.end(JSON.stringify({
      error : `At least one of the media types in your 'Accept' header must be specified without parameters`
    }));
  },
  internalServerError(request, response, message) {
    logger.error(request.url + ' internal server error');
    response.writeHead(500, { 'Content-Type' : mediaType });
    response.end(JSON.stringify({
      error : message
    }));
  }
}

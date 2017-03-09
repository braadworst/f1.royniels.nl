const mediaType = 'application/vnd.api+json';

module.exports = {
  notFound(request, response) {
    response.writeHead(404, { 'Content-Type' : mediaType });
    response.end(JSON.stringify({
      error : 'Page not found'
    }));
  },
  badRequest(request, response) {
    response.writeHead(400, { 'Content-Type' : mediaType });
    response.end(JSON.stringify({
      error : `Bad request, did you set the 'Content-Type' to '${ mediaType }'`
    }));
  },
  unsupportedMediaType(request, response) {
    response.writeHead(415, { 'Content-Type' : mediaType });
    response.end(JSON.stringify({
      error : `It is not allowed to specify media type parameters in the 'Content-Type' header`
    }));
  },
  notAcceptable(request, response) {
    response.writeHead(406, { 'Content-Type' : mediaType });
    response.end(JSON.stringify({
      error : `At least one of the media types in your 'Accept' header must be specified without parameters`
    }));
  }
}

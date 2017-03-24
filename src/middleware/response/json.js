const mediaType = 'application/vnd.api+json';

module.exports = {
  notFound             : response(404, 'Page not found'),
  badRequest           : response(400, `Bad request, did you set the 'Content-Type' to '${ mediaType }'`),
  unsupportedMediaType : response(415, `It is not allowed to specify media type parameters in the 'Content-Type' header`),
  notAcceptable        : response(406, `At least one of the media types in your 'Accept' header must be specified without parameters`),
  internalServerError  : response(500, 'Internal server error'),
  default              : response(200)
}

function response(statusCode, error = 'Nothing to see here') {
  return (request, response, next, relay) => {
    response.setHeader('Content-Type', 'application/vnd.api+json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    response.writeHead(statusCode, { 'Content-Type' : mediaType });
    response.end(JSON.stringify(relay.json ? relay.json : { error });
  }
}

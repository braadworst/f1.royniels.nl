module.exports = {
  default             : response(200),
  internalServerError : response(500, '<h1>Internal server error</h1>'),
  notFound            : response(404, '<h1>Page not found</h1>'),
}

function response(statusCode, html) {
  return (request, response, next, relay) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.statusCode = statusCode;
    response.end(relay.html ? relay.html : html);
  }
}

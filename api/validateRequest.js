// We follow the JSON API specs for our api (http://jsonapi.org/format/1.0/)
// Every request that comes in to the server with the appropreate headers will
// be treated as an API call, this way we can reuse the routes.

module.exports = function(request, response, next) {
  if (!request.headers['Content-Type']) {
    response.sendStatus(400); // TODO, better response when content type is missing
    return;
  }

  const requiredContentType      = 'application/vnd.api+json';
  const givenContentType         = request.headers['Content-Type'].split(';').shift();
  const hasParameters            = request.headers['Content-Type'].split(';').length > 0;

  const allAcceptsHaveParameters = request.header['Accepts']
    .split(',')
    .filter(accept => accept.indexOf(';') === -1)
    .length;

  // Found json api response
  if (givenContentType === requiredContentType) {
    // 406 Not Acceptable
    if (!allAcceptsHaveParameters) {
      response.sendStatus(406);
      return;
    }

    // 415 Unsupported Media Type
    if (hasParameters) {
      response.sendStatus(415);
      return;
    }
  }

  next();
}

module.exports = (contentType, data) => {
  return (request, response, next, relay) => {
    response.setHeader('Content-type', ${ contentType } || 'text/plain' );
    response.end(data);
  }
}

module.exports = (request, response, next, relay) => {
  response.setHeader('Content-Type', 'application/vnd.api+json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.end(relay.data);
}

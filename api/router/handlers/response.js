module.exports = (request, response, next, relay) => {
  response.setHeader('Content-Type', 'application/vnd.api+json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  response.end(JSON.stringify(relay.data));
}

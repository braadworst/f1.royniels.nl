const jsonapi = require('../../extensions/jsonapi');

module.exports = (request, response, next, relay) => {
  const data = jsonapi.serialize(relay.type, relay.data, relay.errors);
  next({ data });
}

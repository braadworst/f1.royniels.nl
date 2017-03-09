const serializer = require('../../../shared/api/serializer');

module.exports = (request, response, next, relay) => {
  const data = serializer.serialize(relay.type, relay.data);
  next({ data });
}

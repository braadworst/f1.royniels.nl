const jsonapi = require('../../extensions/jsonapi');

module.exports = (request, response, next, relay) => {
  let body = false;
  if (relay.body) {
    body = jsonapi.parse(relay.body);
  }
  next({ body  });
}

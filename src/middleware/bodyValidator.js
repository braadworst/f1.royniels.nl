const validator = require('../api/validator');

module.exports = (request, response, next, relay) => {
  if (relay.post) {
    const errors = validator(relay.type, relay.post);
    if (errors) {
      next({ errors });
    }
  }
  next();
}

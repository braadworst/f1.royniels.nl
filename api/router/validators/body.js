const validator = require('../../../shared/api/validator');

module.exports = (request, response, next, relay) => {
  if (relay.post) {
    const errors = validator(relay.type, relay.body);
    if (errors) {
      next({ errors });
    }
  }
  next();
}

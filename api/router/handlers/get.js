const errors = require('./errors');

module.exports = async function(request, response, next, relay) {
  try {
    console.log(relay);
    const schema = require('../../../shared/api/schemas/' + relay.type);
    const data   = await relay.database.find(schema);
    next({ data });
  } catch (error) {
    console.log(error);
    errors.internalServerError(request, response);
  }
}

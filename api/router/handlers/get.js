const errors = require('./errors');

module.exports = async function(request, response, next, relay) {
  try {
    const schema = require('../../../shared/api/schemas/' + relay.type);
    const data   = await relay.database.find(schema, relay.options);
    next({ data });
  } catch (error) {
    console.log(error);
    errors.internalServerError(request, response);
  }
}

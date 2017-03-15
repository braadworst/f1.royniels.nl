const errors = require('./errors');
const logger = require('minilog')('middleware:findData');
require('minilog').enable();

module.exports = async function(request, response, next, relay) {
  try {
    const schema = require('../schemas/' + relay.type);
    const data   = await relay.database.find(schema, relay.options);
    next({ data });
  } catch (error) {
    logger.error(error);
    errors.internalServerError(request, response);
  }
}

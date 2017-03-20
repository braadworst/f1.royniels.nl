const errors = require('./errors');
const logger = require('minilog')('middleware:findStatistics');
require('minilog').enable();

module.exports = async function(request, response, next, relay) {
  try {
    const schema = require('../schemas/' + relay.type);

    // Add joins to the options
    relay.options.joins = [{
      table : 'users',
      fieldA : 'users.id',
      fieldB : 'statistics.userId'
    }];

    const data   = await relay.database.find(schema, relay.options);
    next({ data });
  } catch (error) {
    logger.error(error);
    errors.internalServerError(request, response, error.message);
  }
}

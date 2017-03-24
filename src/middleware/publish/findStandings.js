const errors = require('./errors');
const logger = require('minilog')('middleware:findStandings');
require('minilog').enable();

module.exports = async function(request, response, next, relay) {
  try {
    const schema = require('../schemas/' + relay.type);

    // Add joins to the options
    relay.options.joins = [{
      table : 'teams',
      fieldA : 'standings.teamId',
      fieldB : 'teams.id'
    }, {
      table : 'users',
      fieldA : 'teams.userId',
      fieldB : 'users.id'
    }];

    const data   = await relay.database.find(schema, relay.options);
    next({ data });
  } catch (error) {
    logger.error(error);
    errors.internalServerError(request, response, error.message);
  }
}

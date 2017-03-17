const errors = require('./errors');
const logger = require('minilog')('middleware:findStandings');
require('minilog').enable();

module.exports = async function(request, response, next, relay) {
  try {
    const schema = require('../schemas/' + relay.type);

    // Add joins to the options
    relay.options.joins = [{
      table : 'drivers',
      alias : 'firstDriver',
      fieldA : 'firstDriver.id',
      fieldB : 'teams.firstDriverId'
    }, {
      table : 'drivers',
      alias : 'secondDriver',
      fieldA : 'secondDriver.id',
      fieldB : 'teams.secondDriverId'
    }, {
      table : 'chassis',
      fieldA : 'chassis.id',
      fieldB : 'teams.chassisId'
    }, {
      table : 'engines',
      fieldA : 'engines.id',
      fieldB : 'teams.engineId'
    }, {
      table : 'users',
      fieldA : 'users.id',
      fieldB : 'teams.userId'
    }];

    const data   = await relay.database.find(schema, relay.options);
    next({ data });
  } catch (error) {
    logger.error(error);
    errors.internalServerError(request, response, error.message);
  }
}

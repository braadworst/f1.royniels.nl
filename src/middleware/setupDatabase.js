const logger = require('minilog')('middleware:setupDatabase');
require('minilog').enable();

const schemas  = {
  drivers     : require('../schemas/drivers'),
  chassis     : require('../schemas/chassis'),
  circuits    : require('../schemas/circuits'),
  engines     : require('../schemas/engines'),
  standings   : require('../schemas/standings'),
  predictions : require('../schemas/predictions'),
  results     : require('../schemas/results'),
  teams       : require('../schemas/teams'),
  users       : require('../schemas/users'),
  statistics  : require('../schemas/statistics'),
}

const datasets = {
  drivers  : require('../fixtures/drivers'),
  circuits : require('../fixtures/circuits'),
  engines  : require('../fixtures/engines'),
  chassis  : require('../fixtures/chassis'),
}

module.exports = async function(request, response, next, relay) {
  try {
    await relay.database.drop(schemas.drivers);
    await relay.database.create(schemas.drivers);
    for (let driver of datasets.drivers) {
      await relay.database.insert(schemas.drivers, driver);
    }

    await relay.database.drop(schemas.chassis);
    await relay.database.create(schemas.chassis);
    for (let chassi of datasets.chassis) {
      await relay.database.insert(schemas.chassis, chassi);
    }

    await relay.database.drop(schemas.circuits);
    await relay.database.create(schemas.circuits);
    for (let circuit of datasets.circuits) {
      await relay.database.insert(schemas.circuits, circuit);
    }

    await relay.database.drop(schemas.engines);
    await relay.database.create(schemas.engines);
    for (let engine of datasets.engines) {
      await relay.database.insert(schemas.engines, engine);
    }

    // await relay.database.drop(schemas.statistics);
    // await relay.database.create(schemas.statistics);
    //
    // await relay.database.drop(schemas.standings);
    // await relay.database.create(schemas.standings);
    //
    // await relay.database.drop(schemas.predictions);
    // await relay.database.create(schemas.predictions);
    //
    // await relay.database.drop(schemas.results);
    // await relay.database.create(schemas.results);
    //
    // await relay.database.drop(schemas.teams);
    // await relay.database.create(schemas.teams);
    //
    // await relay.database.drop(schemas.users);
    // await relay.database.create(schemas.users);

    next();
  } catch (error) {
    logger.error(error);
    next();
  }
}

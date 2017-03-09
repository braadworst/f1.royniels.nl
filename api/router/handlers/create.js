const schemas  = {
  drivers : require('../../../shared/api/schemas/drivers'),
  chassis : require('../../../shared/api/schemas/chassis'),
  circuits : require('../../../shared/api/schemas/circuits'),
  engines : require('../../../shared/api/schemas/engines'),
  points : require('../../../shared/api/schemas/points'),
  predictions : require('../../../shared/api/schemas/predictions'),
  results : require('../../../shared/api/schemas/results'),
  teams : require('../../../shared/api/schemas/teams'),
  users : require('../../../shared/api/schemas/users'),
}

const datasets = {
  drivers  : require('../../datasets/drivers'),
  circuits : require('../../datasets/circuits'),
  engines  : require('../../datasets/engines'),
  chassis  : require('../../datasets/chassis'),
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

    await relay.database.drop(schemas.points);
    await relay.database.create(schemas.points);

    await relay.database.drop(schemas.predictions);
    await relay.database.create(schemas.predictions);

    await relay.database.drop(schemas.results);
    await relay.database.create(schemas.results);

    await relay.database.drop(schemas.teams);
    await relay.database.create(schemas.teams);

    await relay.database.drop(schemas.users);
    await relay.database.create(schemas.users);

    // await relay.database.drop(schemas.drivers);
    // await relay.database.create(schemas.drivers);
    // for (let driver of drivers) {
    //   await relay.database.insert(schemas.drivers, driver);
    // }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
}

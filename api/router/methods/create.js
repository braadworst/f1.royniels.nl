const datasets = require('./datasets');

module.exports = async function(database) {
  try {
    // const teams = require('../../shared/schemas/teams');
    // await database.drop(teams);
    // await database.create(teams);

    const users = require('../../shared/schemas/users');
    await database.drop(users);
    await database.create(users);

    const drivers = require('../../shared/schemas/drivers');
    await database.drop(drivers);
    await database.create(drivers);
    await database.insert(drivers, datasets.drivers);

    const engines = require('../../shared/schemas/engines');
    await database.drop(engines);
    await database.create(engines);
    await database.insert(engines, datasets.engines);

    const chassis = require('../../shared/schemas/chassis');
    await database.drop(chassis);
    await database.create(chassis);
    await database.insert(chassis, datasets.chassis);

    const circuits = require('../../shared/schemas/circuits');
    await database.drop(circuits);
    await database.create(circuits);
    await database.insert(circuits, datasets.circuits);
  } catch (error) {
    throw new Error(error);
  }
}

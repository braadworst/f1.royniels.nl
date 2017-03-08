const drivers     = require('../shared/schemas/drivers');
const engines     = require('../shared/schemas/engines');
const chassis     = require('../shared/schemas/chassis');
const circuits    = require('../shared/schemas/circuits');
const teams       = require('../shared/schemas/teams');
const users       = require('../shared/schemas/users');
const Ajv         = require('ajv');
const ajv         = new Ajv({ coerceTypes : true });

module.exports = function(server, database) {
  const router = require('cs-router')(server);

  router.before((request, response, next) => {
    response.setHeader('Content-Type', 'application/vnd.api+json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    // TODO add overflow limit
    console.log(request.method, request.url);
    next();
  });

  router.get('/api/teams', async function(request, response) {
    try {
      let recordsTeams    = await database.selectAll(teams);
      const recordDrivers = await database.selectAll(drivers);
      const recordEngines = await database.selectAll(engines);
      const recordChassis = await database.selectAll(chassis);

      // map all the information to the teams object
      recordsTeams = recordsTeams.map(team => {
        team.engine       = recordEngines.filter(record => record.id === team.engineId).pop();
        team.chassis      = recordChassis.filter(record => record.id === team.chassisId).pop();
        team.firstDriver  = recordDrivers.filter(record => record.id === team.firstDriverId).pop();
        team.secondDriver = recordDrivers.filter(record => record.id === team.secondDriverId).pop();

        return team;
      });

      response.end(JSON.stringify(recordsTeams));
    } catch (error) {
      console.log(error);
      response.end('error');
    }
  });

  router.get('/api/drivers', async function(request, response) {
    const records = await database.selectAll(drivers);
    response.end(JSON.stringify(records));
  });

  router.get('/api/chassis', async function(request, response) {
    const records = await database.selectAll(chassis);
    response.end(JSON.stringify(records));
  });

  router.get('/api/engines', async function(request, response) {
    const records = await database.selectAll(engines);
    response.end(JSON.stringify(records));
  });

  router.get('/api/circuits', async function(request, response) {
    const records = await database.selectAll(circuits);
    response.end(JSON.stringify(records));
  });

  router.post('/api/users/find', async function(request, response) {
    try {
      body = JSON.parse(body);
      const result = await database.findOne(users, body.columnName, body.value);
      response.end(JSON.stringify(result));
    } catch (error) {
      response.end('errors');
    }
  });

  router.post('/api/users/create-or-update', async function(request, response) {
    try {
      const body = JSON.parse(request.body);
      if (ajv.validate(users, body)) {
        console.log(body);
        const user = await database.findOne(users, 'email', body.email);
        console.log(user);
        if (user) {
          await database.update(users, 'token', body.token, user.id);
        } else {
          await database.insert(users, [body]);
        }
        response.end('success');
      } else {
        response.end('invalid');
      }
    } catch (error) {
      console.log(error);
      response.end('');
    }
  });

  router.post('/api/teams', async function(request, response) {
    try {
      body = JSON.parse(request.body);
      if (ajv.validate(teams, body)) {
        const result = await database.insert(teams, [body]);
        response.end('success');
      } else {
        response.end('invalid');
      }
      response.end('Yes!');
    } catch (error) {
      response.end('errors');
    }
  });

  router.noMatch((request, response) => {
    response.writeHead(404, {'Content-Type' : 'text/plain'});
    response.write('Page not found');
    response.end();
  });
}

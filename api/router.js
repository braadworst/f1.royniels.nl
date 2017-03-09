const schemas = {
  drivers  : require('../shared/schemas/drivers'),
  engines  : require('../shared/schemas/engines'),
  chassis  : require('../shared/schemas/chassis'),
  circuits : require('../shared/schemas/circuits'),
  teams    : require('../shared/schemas/teams'),
  users    : require('../shared/schemas/users'),
}

function internalError(response, error) {
  console.log(errors);
  response.writeHead(500, {'Content-Type' : 'text/plain'});
  response.end('Internal server error');
}

async function find(request, response, name) {
  try {
    response.end(
      JSON.stringify(
        await database.find(schemas[name])
      )
    );
  } catch (error) {
    internalError(response, error);
  }
}

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
      let teams   = await database.find(schemas.teams);
      let drivers = await database.find(schemas.drivers);
      let engines = await database.find(schemas.engines);
      let chassis = await database.find(schemas.chassis);

      // map all the information to the teams object
      teams = teams.map(team => {
        team.engine       = engines.filter(record => record.id === team.engineId).pop();
        team.chassis      = chassis.filter(record => record.id === team.chassisId).pop();
        team.firstDriver  = drivers.filter(record => record.id === team.firstDriverId).pop();
        team.secondDriver = drivers.filter(record => record.id === team.secondDriverId).pop();

        return team;
      });

      response.end(JSON.stringify(teams));
    } catch (error) {
      internalError(response, error);
    }
  });

  router.get('/api/drivers', (request, response) => {
    find(request, response, 'drivers');
  });

  router.get('/api/chassis', (request, response) => {
    find(request, response, 'chassis');
  });

  router.get('/api/engines', (request, response) => {
    find(request, response, 'engines');
  });

  router.get('/api/circuits', (request, response) => {
    find(request, response, 'circuits');
  });

  router.get('/api/users', (request, response) => {
    find(request, response, 'users');
  });

  router.post('/api/users/create-or-update', async function(request, response) {
    // try {
    //   const body = JSON.parse(request.body);
    //   if (ajv.validate(users, body)) {
    //     console.log(body);
    //     const user = await database.findOne(users, 'email', body.email);
    //     console.log(user);
    //     if (user) {
    //       await database.update(users, 'token', body.token, user.id);
    //     } else {
    //       await database.insert(users, [body]);
    //     }
    //     response.end('success');
    //   } else {
    //     response.end('invalid');
    //   }
    // } catch (error) {
    //   console.log(error);
    //   response.end('');
    // }
  });

  router.post('/api/teams', async function(request, response) {
    // try {
    //   body = JSON.parse(request.body);
    //   if (ajv.validate(teams, body)) {
    //     const result = await database.insert(teams, [body]);
    //     response.end('success');
    //   } else {
    //     response.end('invalid');
    //   }
    //   response.end('Yes!');
    // } catch (error) {
    //   response.end('errors');
    // }
  });

  router.noMatch((request, response) => {
    response.writeHead(404, {'Content-Type' : 'text/plain'});
    response.end('Page not found');
  });
}

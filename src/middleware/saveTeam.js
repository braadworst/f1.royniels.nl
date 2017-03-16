const errors = require('./errors');
const logger = require('minilog')('middleware:saveData');
require('minilog').enable();

module.exports = async function(request, response, next, relay) {
  if (relay.body) {
    try {
      const post     = relay.body;
      const database = relay.database;
      const schema   = require('../schemas/' + relay.type);

      // Get all the teams by current users
      userTeams = await database.find(schema, { filters : [{ field : 'userId',  value : post.userId }] });

      if (userTeams.length >= relay.settings.maxTeams) {
        next({ errors : `Cannot add new team, limit of ${ relay.settings.maxTeams } reached` });
      } else {
        team  = await database.insert(schema, post);

        // Get all the team, so we can add a blank rank
        teams = await database.find(schema);

        // Add rank
        await database.insert(require('../schemas/standings'), { teamId : team.id, rank : teams.length + 1, points : 0});

        next({ data : team });
      }

    } catch (error) {
      logger.error(error);
      errors.internalServerError(request, response);
    }
  } else {
    next();
  }
}

const format   = require('date-fns/format');
const parse    = require('date-fns/parse');
const isBefore = require('date-fns/is_before');
const errors   = require('./errors');
const logger   = require('minilog')('middleware:saveData');
require('minilog').enable();

module.exports = async function(request, response, next, relay) {
  if (relay.body) {
    try {
      const team     = relay.body;
      const database = relay.database;
      const schema   = require('../schemas/' + relay.type);

      // Update
      if (team.id) {
        const now  = parse(new Date());
        const date = parse(team.editDate);
        if (isBefore(date, now)) {
          const message = 'Cannot change team, edit date has passed';
          logger.warn(message);
          next({ errors : message });
          return;
        }
        const result = await database.update(schema, team);
        next({ data : result });
        return;
      }

      // Get all the teams by current users
      const userTeams = await database.find(schema, { filters : [{ field : 'userId',  value : team.userId }] });

      if (userTeams.length >= relay.settings.maxTeams) {
        next({ errors : `Cannot add new team, limit of ${ relay.settings.maxTeams } reached` });
      } else {
        // const now     = parse(new Date());
        const now     = format(parse(new Date()), 'YYYY-MM-DDTHH:mm:ss');
        const circuit = await database.find(
          require('../schemas/circuits'),
          {
            filters : [{ field : 'date', value : '>' + now}],
            pagination : {
              size : 1
            },
            sort : ['date']
          }
        );

        team.editDate = circuit.pop().date;

        const result = await database.insert(schema, team);

        // Get all the teams, so we can add a blank rank
        const teams = await database.find(schema);

        // Add rank
        await database.insert(require('../schemas/standings'), { teamId : result.id, rank : teams.length + 1, points : 0});

        next({ data : result });
      }

    } catch (error) {
      logger.error(error);
      errors.internalServerError(request, response, error.message);
    }
  } else {
    next();
  }
}

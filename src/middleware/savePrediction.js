const parse    = require('date-fns/parse');
const isBefore = require('date-fns/is_before');
const errors   = require('./errors');
const logger   = require('minilog')('middleware:savePrediction');
require('minilog').enable();

module.exports = async function(request, response, next, relay) {
  if (relay.body) {
    const prediction = relay.body;

    try {
      const now  = parse(new Date());
      const circuit = await relay.database.find(
        require('../schemas/circuits'),
        { filters : [{ field : 'id', value : prediction.circuitId}]
      });
      const date = circuit.pop().date;
      if (!isBefore(now, date)) {
        const message = 'Cannot save prediction, event has already been passed';
        logger.warn(message);
        next({ errors : message });
        return;
      };

      const database = relay.database;
      const schema   = require('../schemas/' + relay.type);
      let result;

      if (!prediction.id) {
        result = await database.insert(schema, prediction);
      } else {
        result = await database.update(schema, prediction);
      }

      next({ data : result });

    } catch (error) {
      logger.error(error);
      errors.internalServerError(request, response, error.message);
    }
  } else {
    next();
  }
}

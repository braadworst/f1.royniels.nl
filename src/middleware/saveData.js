const errors = require('./errors');
const logger = require('minilog')('middleware:saveData');
require('minilog').enable();

module.exports = async function(request, response, next, relay) {
  if (relay.body) {
    try {
      const post     = relay.body;
      const database = relay.database;
      const schema   = require('../schemas/' + relay.type);
      let result;
      if (!post.id) {
        result = await database.insert(schema, post);
      } else {
        result = await database.update(schema, post);
      }
      next({ data : result });
    } catch (error) {
      logger.error(error);
      errors.internalServerError(request, response);
    }
  } else {
    next();
  }
}

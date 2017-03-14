const errors = require('./errors');

module.exports = async function(request, response, next, relay) {
  if (relay.post) {
    try {
      const post     = relay.post;
      const database = relay.database;
      const schema   = require('../../../shared/api/schemas/' + relay.type);
      let result;
      if (!post.id) {
        data = await database.insert(schema, post);
      } else {
        data = await database.update(schema, post);
      }
      next({ data });
    } catch (error) {
      console.log(error);
      errors.internalServerError(request, response);
    }
  } else {
    next();
  }
}

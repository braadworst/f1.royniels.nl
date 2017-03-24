const parse = require('date-fns/parse');

module.exports = async function(request, repsonse, next, relay) {
  if (relay.user) {
    try {
      const now = parse(new Date());
      console.log(now);
      await relay.api.set('statistics', { userId : relay.user.id, path : request.url, date : now});
    } catch (error) {
      console.log(error);
    }
  }
  next();
}

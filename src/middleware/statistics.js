const format = require('date-fns/format');

module.exports = async function(request, repsonse, next, relay) {
  if (relay.user) {
    try {
      const now = parseInt(format(new Date(), 'x'));
      await relay.api.set('statistics', { userId : relay.user.id, path : request.url, date : now});
    } catch (error) {
      console.log(error);
    }
  }
  next();
}

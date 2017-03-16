const logger = require('minilog')('middleware:loginCheck');
require('minilog').enable();

module.exports = async function(request, response, next, relay) {
  if (relay.user) {
    next();
  } else {
    logger.info('No user found, redirect to ' + relay.paths.login);
    relay.router.redirect(relay.paths.login);
  }
}

module.exports = (request, response, next, relay) => {
  if (relay.user) {
    next();
  } else {
    relay.logger.info('No user found, redirect to ' + relay.paths.login);
    relay.router.redirect(relay.paths.login);
  }
}

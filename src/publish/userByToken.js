module.exports = async function(request, response, next, relay) {
  const logger = relay.logger;
  if (relay.token) {
    const published = relay.published ? relay.published : {};


    next(published);
  } else {
    logger.warn('Could not find user, because token is not set');
  }
}

module.exports = async function(request, response, next, relay) {
  const logger    = relay.logger;
  const apiserver = relay.connections.apiserver;
  if (relay.token) {
    try {
      const token     = relay.token;
      const published = relay.published ? relay.published : {};
      published.user  = await apiserver.userByToken(token);
      if (published)
      logger.info(`Succesfully retrieved user for token ${ token }`);
      next(published);
    } catch (error) {
      logger.error(error);
      next();
    }
  } else {
    logger.warn('Could not find user, because token is not set');
  }
}

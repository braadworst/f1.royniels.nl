module.exports = (request, response, next, relay) => {
  const logger = relay.logger;
  if (relay.cookies && relay.cookies.token) {
    logger.info('Token found, extracting from cookies');
    next({ token : relay.cookies.token });
  } else {
    logger.info('Could not find token on cookie object');
    next();
  }
}

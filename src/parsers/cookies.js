module.exports = (request, reponse, next, relay) => {
  const logger = relay.logger;

  if (request.headers.cookie) {
    const cookies = {};
    request.headers.cookie
      .split(';')
      .forEach(cookie => {
        const key   = cookie.split('=').shift().trim();
        const value = cookie.split('=').pop();
        cookies[key] = value;
      });

    logger.info(`${ Object.keys(cookies).length} Cookies parsed`);

    next({ cookies });
  } else {
    logger.info('No cookie found on request');
    next();
  }
}

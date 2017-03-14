const crypto = require('crypto');
const logger = require('minilog')('middleware:loginCheck');

module.exports = async function(request, response, next, relay) {
  const api        = relay.api;
  const router     = relay.router;
  const passphrase = relay.settings.encryption.passphrase;
  const mode       = relay.settings.encryption.mode;

  // Get token from cookie
  if (request.headers.cookie && request.headers.cookie.token) {
    const decipher = crypto.createDecipher(mode, passphrase);
    let   token    = decipher.update(request.headers.cookie.token,'hex','utf-8')
    token         += decipher.final('utf-8');

    try {
      const user = await api.userByToken(token);
      if (user) {
        logger.info('Found user, go to page');
        next({ user });
      } else {
        logger.info('Could not find a user, redirecting to login page');
        router.redirect('/');
      }
    } catch (error) {
      logger.error(error);
      router.redirect('/');
    }

  } else {
    logger.info('No cookie found, redirecting to the homepage');
    router.redirect('/');
  }
}

const errors = require('./errors');
const crypto = require('crypto');
const logger = require('minilog')('middleware:loggedInUser');
require('minilog').enable();

module.exports = (request, response, next, relay) => {

  const passphrase = relay.settings.encryption.passphrase;
  const mode       = relay.settings.encryption.mode;
  const api        = relay.api;

  // Get token from cookie
  if (request.headers.cookie) {
    let encryptedToken = request.headers.cookie.split('=').pop();
    if (!encryptedToken) {
      logger.info('No encrypted token found');
      next();
      return;
    }
    const decipher = crypto.createDecipher(mode, passphrase);
    let   token    = decipher.update(encryptedToken,'hex','utf-8')
    token         += decipher.final('utf-8');

    try {
      const user = await api.get('userByToken', token);
      if (user) {
        logger.info('Found user');
        next({ user });
        return;
      }
    } catch (error) {
      logger.error(error);
      errors.internalServerError(request, response, error.message);
      return;
    }
  }
  next();
}

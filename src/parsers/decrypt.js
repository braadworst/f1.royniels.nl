module.exports = name => {
  return function(request, response, next, relay) => {

    const logger = relay.logger;

    if (relay[name]) {
      const value      = relay[name];
      const crypto     = require('crypto');
      const passphrase = relay.settings.encryption.passphrase;
      const mode       = relay.settings.encryption.mode;
      const decipher   = crypto.createDecipher(mode, passphrase);
      let   decrypted  = decipher.update(value,'hex','utf-8')
      decrypted       += decipher.final('utf-8');
      logger.info(`Succesfully decrypted ${ name }`);
      next({ [name] : decrypted });
    } else {
      logger.info(`Could not decrypt ${ name }, not found in relay object`);
      next();
    }
  }
}

const crypto      = require('crypto');
const cipher      = crypto.createCipher('aes-256-ctr', 'This is the passphrase biatch!!!');
const decipher    = crypto.createDecipher('aes-256-ctr', 'This is the passphrase biatch!!!');

module.exports = {
  encrypt(value) {
    return cipher.update(value, 'utf-8', 'hex');
  },
  decrypt(value) {
    return decipher.update(value, 'utf-8', 'hex');
  }
}

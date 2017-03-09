const crypto      = require('crypto');

module.exports = {
  encrypt(text){
    var cipher  = crypto.createCipher('aes-256-ctr', 'This is the passphrase biatch!!!');
    var crypted = cipher.update(text,'utf-8','hex')
    crypted += cipher.final('hex');
    return crypted;
  },
  decrypt(text){
    var decipher = crypto.createDecipher('aes-256-ctr', 'This is the passphrase biatch!!!');
    var dec      = decipher.update(text,'hex','utf-8')
    dec += decipher.final('utf-8');
    return dec;
  }
}

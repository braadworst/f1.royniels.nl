const crypto      = require('crypto');

module.exports = () => {

}

{
  encrypt(text){
    var cipher  = crypto.createCipher('aes-256-ctr', 'This is the passphrase biatch!!!');
    var crypted = cipher.update(text,'utf-8','hex')
    crypted += cipher.final('hex');
    return crypted;
  },
  decrypt(text){

  }
}

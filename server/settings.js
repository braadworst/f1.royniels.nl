const fs = require('fs');

module.exports = (function() {
  if (process.env.NODE_ENV === 'development') {
    return {
      port : 4443,
      options : {
        key  : fs.readFileSync('./certs/key.pem'),
        cert : fs.readFileSync('./certs/cert.pem')
      }
    }
  }
}());

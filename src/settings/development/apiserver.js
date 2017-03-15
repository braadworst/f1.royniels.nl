const fs   = require('fs');

module.exports = {
  certs : {
    key  : fs.readFileSync('./certs/key.pem'),
    cert : fs.readFileSync('./certs/cert.pem')
  },
  port : 4444,
  databaseName: 'f1manager'
}

// const fs   = require('fs');

module.exports = {
  // certs : {
  //   key  : fs.readFileSync('./certs/key.pem'),
  //   cert : fs.readFileSync('./certs/cert.pem')
  // },
  encryption : {
    passphrase : 'This is the passphrase biatch!!!',
    mode       : 'aes-256-ctr'
  },
  maxTeams : 3,
  port : 4445,
  databaseName: 'f1manager',
  points : {
    one     : 25,
    two     : 18,
    three   : 15,
    four    : 12,
    five    : 10,
    six     : 8,
    seven   : 6,
    eight   : 4,
    nine    : 2,
    ten     : 1,
    best    : 10,
    fastest : 10
  }
}

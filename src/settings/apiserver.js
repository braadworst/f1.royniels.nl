module.exports = () => {
  const everywhere = require('./helpers/everywhere');
  const serverside = require('./helpers/serverside');
  const server     = {
    port         : 4444,
    domain       : 'localhost',
    databaseName : 'f1manager'
  };

  return Object.assign(everywhere, serverside, server);
}

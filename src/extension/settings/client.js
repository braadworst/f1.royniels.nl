module.exports = () => {

  const everywhere = require('./helpers/everywhere');
  const client     = {
    apiDomain : window.location.hostname === 'localhost' ? 'http://localhost:4444' : 'https://api.royniels.nl'
  }

  return Object.assign(everywhere, client);
}

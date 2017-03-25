module.exports = {
  webserver : {
    development : {
      redirectDomain : 'http://localhost:4443',
      cookieDomain : 'localhost'
    },
    production : {
      redirectDomain : 'http://f1.royniels.nl',
      cookieDomain : '.royniels.nl'
    }
  }
}

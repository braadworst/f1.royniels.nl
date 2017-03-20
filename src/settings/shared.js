module.exports = {
  encryption : {
    passphrase : 'This is the passphrase biatch!!!',
    mode       : 'aes-256-ctr'
  },
  apiserver: {
    domain : 'localhost',
    port   : 4444,
    uri    : 'http://localhost:4444'
  },
  webserver : {
    domain : 'localhost',
    port   : 4443,
    uri    : 'http://localhost:4443'
  },
  databaseName : 'f1manager',
  maxTeams     : 3,
  driversLimit : 2,
  chassisLimit : 1,
  enginesLimit : 1,
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
  },
  paths : {
    login           : '/',
    logout          : '/logout',
    teams           : '/teams',
    team            : '/teams/new',
    teamEdit        : '/teams/edit/:id',
    standings       : '/standings',
    rules           : '/rules',
    predictions     : '/predictions',
    results         : '/results',
    githubConsent   : '/auth/github',
    githubToken     : '/auth/github/callback',
    googleConsent   : '/auth/google',
    googleToken     : '/auth/google/callback',
    facebookConsent : '/auth/facebook',
    facebookToken   : '/auth/facebook/callback'
  },
  cache : {
    statics : {
      'max-age' : 60 * 60 * 24 * 365 // year
    }
  }
}

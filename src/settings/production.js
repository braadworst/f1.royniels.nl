const ignore = require('./ignore');

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
  cache : {
    statics : {
      'max-age' : 60 * 60 * 24 * 365 // year
    }
  },
  cookieDomain : '.royniels.nl',
  databaseName : 'f1manager',
  google: {
    clientId     : ignore.production.google.clientId,
    clientSecret : ignore.production.google.clientSecret,
    redirectUri  : 'https://f1.royniels.nl/auth/google/callback',
    consent: {
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      parameters: {
        response_type: 'code',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
      }
    },
    token: {
      url: 'https://www.googleapis.com/oauth2/v4/token',
      parameters: {
        grant_type: 'authorization_code'
      }
    },
    email: {
      url: 'https://www.googleapis.com/oauth2/v1/userinfo'
    }
  },
  facebook: {
    clientId     : ignore.production.facebook.clientId,
    clientSecret : ignore.production.facebook.clientSecret,
    redirectUri  : 'https://f1.royniels.nl/auth/facebook/callback',
    consent: {
      url: 'https://www.facebook.com/v2.8/dialog/oauth',
      parameters: {
        scope: 'email',
        response_type: 'code'
      }
    },
    token: {
      url: 'https://graph.facebook.com/v2.8/oauth/access_token'
    },
    email: {
      url: 'https://graph.facebook.com/me',
      parameters: {
        fields: 'email,name'
      }
    }
  },
  github: {
    clientId     : ignore.production.github.clientId,
    clientSecret : ignore.production.github.clientSecret,
    redirectUri  : 'https://f1.royniels.nl/auth/github/callback',
    consent: {
      url: 'https://github.com/login/oauth/authorize',
      parameters: {
        scope: 'user:email'
      }
    },
    token: {
      url: 'https://github.com/login/oauth/access_token'
    },
    email: {
      url: 'https://api.github.com/user/emails'
    }
  }
}

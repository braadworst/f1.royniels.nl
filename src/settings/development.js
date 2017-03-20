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
  cookieDomain : 'localhost',
  databaseName : 'f1manager',
  google: {
    clientId     : ignore.development.google.clientId,
    clientSecret : ignore.development.google.clientSecret,
    redirectUri  : 'http://localhost:4443/auth/google/callback',
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
    clientId     : ignore.development.facebook.clientId,
    clientSecret : ignore.development.facebook.clientSecret,
    redirectUri  : 'http://localhost:4443/auth/facebook/callback',
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
    clientId     : ignore.development.github.clientId,
    clientSecret : ignore.development.github.clientSecret,
    redirectUri  : 'http://localhost:4443/auth/github/callback',
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

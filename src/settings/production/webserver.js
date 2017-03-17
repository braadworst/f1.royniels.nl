const fs   = require('fs');

module.exports = {
  apiDomain : 'https://localhost:4444/',
  encryption : {
    passphrase : 'This is the passphrase biatch!!!',
    mode       : 'aes-256-ctr'
  },
  // certs : {
  //   key  : fs.readFileSync('./certs/key.pem'),
  //   cert : fs.readFileSync('./certs/cert.pem')
  // },
  domain : '37.139.18.119',
  port: 4443,
  google: {
    clientId     : '906777770784-755g7991ejmgib606m0g95eg658h07c2.apps.googleusercontent.com',
    clientSecret : '1NK7PxbUaJaPxU-9bz4RYWRx',
    redirectUri  : 'https://localhost:4443/auth/google/callback',
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
    clientId     : '754074994750154',
    clientSecret : 'c41aec90cf93cb4825bceae46c2237f9',
    redirectUri  : 'https://localhost:4443/auth/facebook/callback',
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
    clientId     : '62cf31b86a186dc08f43',
    clientSecret : 'cf3cb495f64c137e2a4a09992e8b8fc018ab80cb',
    redirectUri  : 'https://localhost:4443/auth/github/callback',
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

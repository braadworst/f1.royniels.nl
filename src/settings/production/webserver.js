const fs   = require('fs');

module.exports = {
  apiDomain : 'http://localhost:4445/',
  encryption : {
    passphrase : 'This is the passphrase biatch!!!',
    mode       : 'aes-256-ctr'
  },
  // certs : {
  //   key  : fs.readFileSync('./certs/key.pem'),
  //   cert : fs.readFileSync('./certs/cert.pem')
  // },
  domain : 'localhost',
  port: 4443,
  redirectDomain : 'https://f1.royniels.nl',
  google: {
    clientId     : '906777770784-755g7991ejmgib606m0g95eg658h07c2.apps.googleusercontent.com',
    clientSecret : '1NK7PxbUaJaPxU-9bz4RYWRx',
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
    clientId     : '233727290424291',
    clientSecret : 'ca7306eef37f058332ac0fa1d241d5ef',
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
    clientId     : '280bc0a3cef455ee4ea2',
    clientSecret : '20b5538de13800d14968cdaa9636940397f108e2',
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

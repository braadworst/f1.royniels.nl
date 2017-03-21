module.exports = () => {
  const current     = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
  const ignore      = require('./ignore')[current];
  const environment = require('./environment').webserver[current];
  const everywhere  = require('./helpers/everywhere');
  const serverside  = require('./helpers/serverside');
  const server      = {
    port           : 4443,
    domain         : 'localhost',
    cookieDomain   : environment.cookieDomain,
    redirectDomain : environment.redirectDomain
    google: {
      clientId     : ignore.google.clientId,
      clientSecret : ignore.google.clientSecret,
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
      clientId     : ignore.facebook.clientId,
      clientSecret : ignore.facebook.clientSecret,
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
      clientId     : ignore.github.clientId,
      clientSecret : ignore.github.clientSecret,
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
  };

  return Object.assign(everywhere, serverside, server);
}

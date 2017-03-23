const settings = require('../settings/webserver');
const protocol = require('http');
const server   = protocol.createServer();
const core     = require('lr-core');
const router   = require('lr-router-http')(server, settings.redirectDomain);
const api      = require('lr-api-client-http');
const renderer = require('lr-renderer-server');

server.listen(settings.port, settings.domain, function() {
  logger.info(`server running on ${ settings.domain }:${ settings.port }`);
});

const parsers = {
  cookies : require('../parsers/cookies'),
  token   : require('../parsers/token'),
  dycrypt : require('../parsers/decrypt'),
}

const login = {
  check    : require('../login/check'),
  redirect : require('../login/redirect'),
}

const helpers = {
  statics : require('../helpers/statics')
}

const path = settings.paths.path;
const allButAuth = settings.paths.exclude(
  'logout',
  'githubConsent',
  'githubToken',
  'facebookConsent',
  'facebookToken',
  'googleConsent',
  'googleToken'
);
const allButAuthAndLogin = settings.paths.exclude(
  'login',
  'logout',
  'githubConsent',
  'githubToken',
  'facebookConsent',
  'facebookToken',
  'googleConsent',
  'googleToken'
);
const allButLogin = settings.paths.exclude('login');

module.exports = () => {
  core
    .extension('router', router)
    .extension('api', api, settings.apiDomain)
    .extension('renderer', renderer)
    .get(allButAuth, helpers.statics)
    .get(allButAuth, parsers.cookies)
    .get(allButAuth, parsers.token)
    .get(allButAuth, parsers.decrypt('token'))
    .get(allButAuth, '/users?filter[token]=$', 'token', 'user')
    .get(allButAuthAndLogin, login.check)
    .get(path('login'), login.redirect)
    .get(allButLogin, 'default')
    .get(path('login') , 'login')
    .get(allButAuthAndLogin, '/teams?filter[userId]=$', 'user.id', 'userTeams')
    .get(allButAuthAndLogin, 'navigation', 'user', 'userTeams')
    .get(allButAuthAndLogin, 'navigation', '#menu')
}

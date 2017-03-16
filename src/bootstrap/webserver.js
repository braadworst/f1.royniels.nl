const protocol       = require('spdy');
const tokenDecrypt   = require('../middleware/tokenDecrypt');
const statics        = require('../middleware/statics');
const loginCheck     = require('../middleware/loginCheck');
const loginProcess   = require('../middleware/loginProcess');
const template       = require('../middleware/template');
const component      = require('../middleware/component');
const componentId    = require('../middleware/componentId');
const logout         = require('../middleware/logout');
const htmlResponse   = require('../middleware/htmlResponse');
const errors         = require('../middleware/errors');
const setupWebserver = require('../middleware/setupWebserver');
const paths          = require('../paths');
const logger         = require('minilog')('webserver');
const settings       = require('../settings')('webserver');
require('minilog').enable();

// Create HTTP2 server
const server = protocol.createServer(settings.certs);

// Set the shared routes
const router = require('cs-router')(server);

const excludes = [
  paths.login,
  paths.logout,
  paths.githubConsent,
  paths.githubToken,
  paths.googleConsent,
  paths.googleToken,
  paths.facebookConsent,
  paths.facebookToken,
];

router
  .before((request, response, next) => { logger.info(request.url); next(); })
  .before((request, response, next) => next({ paths, router }))
  .before(setupWebserver)
  .before(statics, excludes)
  .before(tokenDecrypt, excludes)
  .before(loginCheck, excludes)
  .before(template)
  .before(component('navigation', '#menu'), excludes)
  .get(paths.login, component('login', '#loginMain'))
  .get(paths.logout, logout)
  .get(paths.githubConsent, loginProcess.consent(settings.github))
  .get(paths.githubToken, loginProcess.token(settings.github))
  .get(paths.facebookConsent, loginProcess.consent(settings.facebook))
  .get(paths.facebookToken, loginProcess.token(settings.facebook))
  .get(paths.googleConsent, loginProcess.consent(settings.google))
  .get(paths.googleToken, loginProcess.token(settings.google))
  .get(paths.teams, component('teams', '#main'))
  .get(paths.team, component('team', '#main'))
  .get(paths.teamEdit, componentId('team', '#main'))
  .get(paths.predictions, component('predictions', '#main'))
  .get(paths.standings, component('standings', '#main'))
  .get(paths.rules, component('rules', '#main'))
  .get(paths.results, component('results', '#main'))
  .after(htmlResponse)
  .noMatch(errors.notFound);

server.listen(settings.port, function() {
  logger.info('Server listening on port: ' + settings.port);
});

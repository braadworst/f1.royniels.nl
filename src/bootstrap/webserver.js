const protocol       = require('http');
const statics        = require('../middleware/statics');
const loggedInUser   = require('../middleware/loggedInUser');
const loginCheck     = require('../middleware/loginCheck');
const loginProcess   = require('../middleware/loginProcess');
const template       = require('../middleware/template');
const component      = require('../middleware/component');
const componentId    = require('../middleware/componentId');
const logout         = require('../middleware/logout');
const htmlResponse   = require('../middleware/htmlResponse');
const errors         = require('../middleware/errors');
const setupWebserver = require('../middleware/setupWebserver');
const statistics     = require('../middleware/statistics');
const logger         = require('minilog')('webserver');
const settings       = require('../settings');
const paths          = settings.paths;

require('minilog').enable();

// Create HTTP2 server
const server = protocol.createServer();

// Set the shared routes
const router = require('cs-router')(server, settings.webserver.uri);

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
  .before((request, response, next) => next({ paths, router, settings }))
  .before(setupWebserver)
  .before(statics, excludes)
  .before(loggedInUser, excludes)
  .before(loginCheck, excludes)
  .before(statistics)
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
  .after(htmlResponse)
  .noMatch(errors.notFound);

require('./shared')(router);

server.listen(settings.webserver.port, settings.webserver.domain, function() {
  logger.info('webserver listening on port: ' + settings.webserver.domain + ':' + settings.webserver.port);
});

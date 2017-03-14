const protocol     = require('spdy');
const logger       = require('minilog')('webserver');
const settings     = require('../settings')('server');
const components   = require('../components');
const renderer     = require('../renderer/webserver');
const api          = require('../api');

const tokenDecrypt = require('../middleware/tokenDecrypt');
const statics      = require('../middleware/statics');
const loginCheck   = require('../middleware/loginCheck');
const loginProcess = require('../middleware/loginProcess');
const template     = require('../middleware/template');
const component    = require('../middleware/component');
const logout       = require('../middleware/logout');
const htmlResponse = require('../middleware/htmlResponse');
const errors       = require('../middleware/errors');

const paths        = settings.paths;
require('minilog').enable();

// Register components
components.register(require('../components/register'));

// Add callbacks
components.template.render((html, placeholder) => {
  renderer.render(html, placeholder);
});

components.data.fetch(dataset => {
  return api.get[dataset]();
});

// Create HTTP2 server
const server = protocol.createServer(settings.certs);

// Set the shared routes
const router = require('cs-router')(server);

const excludes = [
  paths.login,
  paths.logout,
  paths.authentication.github.consent,
  paths.authentication.github.token,
  paths.authentication.google.consent,
  paths.authentication.google.token,
  paths.authentication.facebook.consent,
  paths.authentication.facebook.token,
];

router
  .before((request, response, next) => { logger.info(`Request: ${ request.url }`); next() })
  .before((request, response, next) => next( { router, settings, components, renderer, api }))
  .before(statics, excludes)
  .before(tokenDecrypt, excludes)
  .before(loginCheck, excludes)
  .before(template)
  // .before(component('navigation', '#navigation'), excludes)
  .get(paths.login, component('login', '#main'))
  .get(paths.logout, logout)
  .get(paths.authentication.github.consent, loginProcess.consent(settings.webserver.github))
  .get(paths.authentication.github.token, loginProcess.token(settings.webserver.github))
  .get(paths.authentication.facebook.consent, loginProcess.consent(settings.webserver.facebook))
  .get(paths.authentication.facebook.token, loginProcess.token(settings.webserver.facebook))
  .get(paths.authentication.google.consent, loginProcess.consent(settings.webserver.google))
  .get(paths.authentication.google.token, loginProcess.token(settings.webserver.google))
  .get(paths.teams, component('teams', '#main'))
  .get(paths.teamCreate, component('teamCreate', '#main'))
  .get(paths.teamEdit, component('teamCreate', '#main'))
  .get(paths.races, component('races', '#main'))
  .get(paths.standings, component('standings', '#main'))
  .get(paths.rules, component('rules', '#main'))
  .after(htmlResponse)
  .noMatch(errors.notFound);

server.listen(settings.webserver.port, function() {
  logger.info('Server listening on port: ' + settings.webserver.port);
});

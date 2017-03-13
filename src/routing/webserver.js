const settings     = require('../settings')('server');
const tokenDecrypt = require('../middleware/tokenDecrypt');
const statics      = require('../middleware/statics');
const loginCheck   = require('../middleware/loginCheck');
const loginProcess = require('../middleware/loginProcess');
const template     = require('../middleware/template');
const components   = require('../components');
const renderer     = require('../renderer/webserver');

module.exports = function(server) {

  // Set the shared routes
  const router = require('./shared')(server);

  router
    .before((request, response, next) => next( { router, settings, components, renderer }))
    .before(tokenDecrypt)
    .before(loginCheck, '/')
    .before(statics)
    .before(template)
    .get('/auth/github', loginProcess.consent(settings.webserver.github))
    .get('/auth/github/callback', loginProcess.token(settings.webserver.github))
    .get('/auth/facebook', loginProcess.consent(settings.webserver.facebook))
    .get('/auth/facebook/callback', loginProcess.token(settings.webserver.facebook))
    .get('/auth/google', loginProcess.consent(settings.webserver.google))
    .get('/auth/google/callback', loginProcess.token(settings.webserver.google))

}

const settings     = require('../settings')('server');
const tokenDecrypt = require('../middleware/tokenDecrypt');
const statics      = require('../middleware/statics');
const loginCheck   = require('../middleware/loginCheck');
const loginConsent = require('../middleware/loginConsent');
const loginToken   = require('../middleware/loginToken');

module.exports = function(server) {

  // Set the shared routes
  const router = require('./shared')(server);

  router
    .before((request, response, next) => next( { router, settings }))
    .before(tokenDecrypt)
    .before(loginCheck, '/')
    .before(statics)
    .before(initialize)
    .get('/auth/github', loginConsent(settings.webserver.github))
    .get('/auth/github/callback', loginToken(settings.webserver.github))
    .get('/auth/facebook', loginConsent(settings.webserver.facebook))
    .get('/auth/facebook/callback', loginToken(settings.webserver.facebook))
    .get('/auth/google', loginConsent(settings.webserver.google))
    .get('/auth/google/callback', loginToken(settings.webserver.google))

}

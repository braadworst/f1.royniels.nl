const passport         = require('passport');
// const strategyFacebook = require('passport-facebook');
// const strategyTwitter  = require('passport-twitter');
// const strategyLinkedin = require('passport-linkedin');
// const strategyGithub   = require('passport-github');
// const strategyReddit   = require('passport-reddit');
const strategyGoogle   = require('passport-google').Strategy;
const settings         = require('package-settings');

module.exports = function(router) {

  // Setup google authenticate
  passport.use(new strategyGoogle({
      clientID: settings.webserver.strategy.google.clientId,
      clientSecret: settings.webserver.strategy.google.clientSecret,
      returnURL: settings.webserver.strategy.google.callbackUrl
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  ));

  router.get(settings.webserver.strategy.google.authPath, (request, response) => {
    console.log('authenticate');
    try {
      passport.authenticate('google', { scope: ['profile'] });
    } catch (error) {
      console.log(error);
    }
    response.end('');
  });

  router.get(settings.webserver.strategy.google.callbackPath, (request, response) => {
    console.log('callback url');
    // passport.authenticate('google'),
    // function(req, res) {
    //   // Successful authentication, redirect home.
    //   res.redirect('/');
    // });
  });
}

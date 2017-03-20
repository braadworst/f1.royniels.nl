module.exports = async function(request, response, next, relay) {
  let yesterday = new Date();
  yesterday = new Date(yesterday.setDate(yesterday.getDate() + 1)).toUTCString();

  try {
    let user = relay.user;
    user.token = '';
    user.isAdmin = user.isAdmin ? true : false;
    console.log(user);
    await relay.api.set('user', user);
  } catch (error) {
    console.log(error);
  }

  response.setHeader('Set-Cookie', [
    'token=',
    'Secure',
    'SameSite=Strict',
    'Expires=' + yesterday,
    'Domain=' + relay.settings.cookieDomain,
    'Path=/'
  ].join('; '));

  relay.router.redirect(relay.paths.login);
}

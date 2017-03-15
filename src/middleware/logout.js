module.exports = (request, response, next, relay) => {
  let yesterday = new Date();
  yesterday = new Date(yesterday.setDate(yesterday.getDate() + 1)).toUTCString();

  response.setHeader('Set-Cookie', [
    'token=',
    'Secure',
    'SameSite=Strict',
    'Expires=' + yesterday,
    'Domain=localhost',
    'Path=/'
  ].join('; '));

  relay.router.redirect(relay.paths.login);
}

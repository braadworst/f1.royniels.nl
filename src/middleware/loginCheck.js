const crypto = require('crypto');

module.exports = async function(request, response, next, relay) {
  const api        = relay.api;
  const router     = relay.router;
  const passphrase = relay.settings.encryption.passphrase;
  const mode       = relay.settings.encryption.mode;

  // Get token from cookie
  if (request.headers.cookie && request.headers.cookie.token) {
    const decipher = crypto.createDecipher(mode, passphrase);
    let   token    = decipher.update(request.headers.cookie.token,'hex','utf-8')
    token         += decipher.final('utf-8');

    try {
      const user = await api.get('/users?filters[token]=' + token);
      if (user) {
        next({ user });
      } else {
        router.redirect('/');
      }
    } catch (error) {
      console.log(error);
      router.ridirect('/');
    }

  } else {
    router.redirect('/');
  }
}

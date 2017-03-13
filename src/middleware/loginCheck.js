module.exports = async function(request, response, next, relay) {
  const api    = require('../api')(relay.settings);
  const token  = relay.token;
  const router = relay.router;

  if (token) {
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
    router.redirect('/')
  }
}

module.exports = async function(request, response, next, relay) {
  const debug = relay.debug;
  debug.namespace('userByToken');
  if (relay.token) {
    try {
      const me = await relay.api.get('users', { 'filter[token]', relay.token });
      next({ me });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    debug.log('Token not found, cannot retrieve user');
    next();
  }
}

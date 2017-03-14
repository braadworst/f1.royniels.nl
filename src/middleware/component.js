module.exports = (name, placeholder) => {
  return async function(request, response, next, relay) {
    await relay.components.create(name, placeholder);
    next();
  }
}

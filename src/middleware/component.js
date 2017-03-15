module.exports = (name, placeholder) => {
  return async function(request, response, next, relay) {
    try {
      await relay.components.create(name, placeholder);
    } catch (error) {
      console.log('COMPONENT', error);
    }
    next();
  }
}

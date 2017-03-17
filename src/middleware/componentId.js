module.exports = (name, placeholder) => {
  return async function(request, response, next, relay) {
    try {
      let id = request.parameters.id ? request.parameters.id : undefined;
      await relay.components.create(name, placeholder, id);
    } catch (error) {
      console.log('COMPONENT', error);
    }
    next();
  }
}

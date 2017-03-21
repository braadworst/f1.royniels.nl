module.exports = (name, value) => {
  return function(request, response, next, relay) {
    next({ [name] : value });
  }
}

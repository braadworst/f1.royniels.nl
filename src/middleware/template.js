module.exports = (request, response, next, relay) => {
  if (request.url === '/') {
    relay.renderer.template(require('../templates/default'));
  } else {
    relay.renderer.template(require('../templates/login'));
  }
  next();
}

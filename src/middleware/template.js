module.exports = (request, response, next, relay) => {
  if (request.url === relay.settings.paths.login) {
    relay.renderer.template(require('../templates/login'));
  } else {
    relay.renderer.template(require('../templates/default'));
  }
  next();
}

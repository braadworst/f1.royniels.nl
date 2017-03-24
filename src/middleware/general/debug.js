module.exports = (request, response, next, relay) => {
  relay.logger.namespace('routing');
  relay.logger.log(request.url);
  next();
}

module.exports = (next, relay, request) => {
  relay.logger.namespace('routing');
  relay.logger.log(request.url);
  next();
}

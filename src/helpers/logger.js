module.exports = (request, response, next, relay) => {
  const logger = require('minilog')('app');
  require('minilog').enable();

  next({ logger });
}

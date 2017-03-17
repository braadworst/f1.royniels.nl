const logger = require('minilog')('settings');
require('minilog').enable();

module.exports = function(type) {
  const environment = process.env.NODE_ENV;
  let settings      = {};

  try {
    if (type) {
      console.log(__dirname + `/${ environment }/${ type }`);
      settings = require(__dirname + `/${ environment }/${ type }`);
    }
  } catch (error) {
    logger.warn(`Could not load all settings, file ${ type } could not be found for environment ${ environment }`);
  }

  return settings;
}

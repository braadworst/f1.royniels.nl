module.exports = (function() {

  let settings = require('./shared');

  try {
    const environment = process.env.NODE_ENV;
    settings = Object.assign(settings, require(`./${ environment }`));
  } catch (error) {
  }

  return settings;
}());

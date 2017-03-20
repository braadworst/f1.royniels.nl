module.exports = (function() {

  let settings = require('./shared');

  try {
    const environment = process.env.NODE_ENV;
    settings = Object.assign(settings, require(`./${ environment }`));
  } catch (error) {
    if (!window) {
      console.warn(`Could not load the server side settings`);
    }
  }

  return settings;
}());

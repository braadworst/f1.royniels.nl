const constants = require('../constants');

// Add new methods here, this url helper can be used (mainly in templates but
// not limited) to get a path to a specific page, this is the prefered way.
// Don't use hardcoded urls! They are hard to maintain and error prone.
module.exports = (function() {
  return {
    home(...params) {
      return merge(constants.url.URL_HOME, params);
    }
  }

  function merge(url, params) {
    return url
      .split('/')
      .map(e => {
        if (e.indexOf(':') === 0) {
          if (!params.length) {
            throw new Error(`You defined a new url, but didn't supply enough parameters`);
          }
          return params.shift();
        }
        return e;
      })
      .join('/');
  }
}());

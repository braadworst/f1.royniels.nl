require('babel-polyfill');

document.addEventListener("DOMContentLoaded", function(event) {
  const state = require('../shared/state')(window.__PRELOADED_STATE__);

  require('../shared/routing/router').before(request => {
    return { state };
  });

  require('../shared/components')(require('./renderer'), state);
});

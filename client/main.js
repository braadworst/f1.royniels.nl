require('babel-polyfill');

document.addEventListener("DOMContentLoaded", function(event) {
  let state      = require('../shared/state')(window.__PRELOADED_STATE__);
  let components = require('../shared/components')(require('./renderer'), state);
  require('../shared/routing/router')().before((request, response, next) => {
    next({ state, components });
  });
});

require('babel-polyfill');

document.addEventListener("DOMContentLoaded", function(event) {
  let state      = require('../shared/state')(window.__PRELOADED_STATE__);
  let renderer   = require('./renderer')(state);
  let router     = require('../shared/routing/router')();
  let components = require('../shared/components')(state, renderer);
  router.before((request, response, next) => {
    next({ state, components });
  });
});

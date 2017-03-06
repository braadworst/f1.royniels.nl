require('babel-polyfill');

document.addEventListener("DOMContentLoaded", function(event) {
  const state     = require('../shared/state')(window.__PRELOADED_STATE__);
  const router    = require('../shared/router')();
  const component = require('../shared/components')(state);
  const renderer  = require('./renderer')(state);

  router.before(request => {
    return { state };
  });

  component.init(renderer);
  renderer.init(component);
});

require('babel-polyfill');

document.addEventListener("DOMContentLoaded", function(event) {
  const store     = require('../shared/store')(window.__PRELOADED_STATE__);
  const router    = require('../shared/router')();
  const component = require('../shared/components')(store);
  const renderer  = require('./renderer')(store);

  router.before(request => {
    return { store };
  });

  component.init(renderer);
  renderer.init(component);
});

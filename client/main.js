const store           = require('../shared/helpers/store')(window.__PRELOADED_STATE__);
const router          = require('./router')(store);
const component       = require('../shared/components')(store);

document.addEventListener("DOMContentLoaded", function(event){

  const renderer = require('./renderer')(store);

  component.init(renderer);
  renderer.init(component);
});

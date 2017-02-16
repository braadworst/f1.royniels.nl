const html  = require('./html');

module.exports = function() {
  return {
    create(renderer, store) {
      renderer.render(html());
    }
  }
}

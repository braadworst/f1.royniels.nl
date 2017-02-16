const html = require('./html');

module.exports = function() {

  return {
    create(renderer) {
      renderer.render(html());
    }
  }
}

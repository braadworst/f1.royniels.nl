const html    = require('./html');
const request = require('../../data/request');

module.exports = function() {

  return {
    create(renderer) {
      renderer.render(html(), true); 
    }
  }
}

const html    = require('./html');
const drivers = require('../../fixtures/drivers');
const engines = require('../../fixtures/engines');
const chassis = require('../../fixtures/chassis');

module.exports = function() {

  return {
    create(renderer) {
      renderer.render(html({
        drivers,
        engines,
        chassis,
        budget : 150000000
      }));
    }
  }
}

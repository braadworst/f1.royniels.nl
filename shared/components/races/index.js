const html     = require('./html');
let   circuits = require('../../fixtures/circuits');
const drivers  = require('../../fixtures/drivers');
const moment   = require('moment');

module.exports = function() {

  return {
    create(renderer) {

      const now = moment();

      // set parameters based on the current date
      circuits = circuits.map(circuit => {
        return Object.assign(
          {},
          circuit,
          { passed : circuit.date.isSameOrBefore(now) }
        )
      });

      // Set upcoming race
      circuits[circuits.findIndex(circuit => !circuit.passed)].upcoming = true;

      renderer.render(html({
        circuits,
        drivers
      }));
    }
  }
}

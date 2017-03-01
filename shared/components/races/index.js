const loaded      = require('./html/loaded');
const loading     = require('./html/loading');
const bulkRequest = require('../../data/bulkRequest');
const moment      = require('moment');

module.exports = () => {
  return {
    async create(renderer, store) {
      try {
        renderer.render(loading());
        let { circuits, drivers } = await bulkRequest('circuits', 'drivers', store);

        // set parameters based on the current date
        circuits = circuits.map(circuit => {
          circuit.date = moment(circuit.date, 'DD-MM-YYYY');
          return Object.assign({}, circuit, { passed : circuit.date.isSameOrBefore(moment()) }
          )
        });

        // Set upcoming race
        circuits[circuits.findIndex(circuit => !circuit.passed)].upcoming = true;

        renderer.render(loaded({ circuits, drivers }), true);
      } catch (error) {
        console.log(error);
      }
    }
  }
}

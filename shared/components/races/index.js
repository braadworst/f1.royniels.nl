const moment  = require('moment');
const loaded  = require('./loaded');
const loading = require('./loading')();
const failed  = require('./failed')();

module.exports = create => {
  create(async function(render, state) {
    try {
      render(loading);

      let circuits = await state.get('data.circuits');

      // set parameters based on the current date
      circuits = circuits.map(circuit => {
        circuit.date = moment(circuit.date, 'DD-MM-YYYY');
        return Object.assign({}, circuit, { passed : circuit.date.isSameOrBefore(moment()) }
        )
      });

      // Set upcoming race
      circuits[circuits.findIndex(circuit => !circuit.passed)].upcoming = true;

      render(loaded(
        circuits,
        await state.get('data.drivers')
      ));
    } catch (error) {
      render(failed);
    }
  });
}

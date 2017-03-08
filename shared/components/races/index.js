// const fetcha  = require('fetcha');
const loaded  = require('./loaded');
const loading = require('./loading')();
const failed  = require('./failed')();

module.exports = component => {
  component
    .data('circuits', 'drivers')
    .loading(() => component.render(loading))
    .failed(() => component.render(failed))
    .loaded((circuits, drivers) => {
      // circuits = circuits.map(circuit => {
      //   // circuit.date = fetcha.parse(circuit.date, 'DD-MM-YYYY');
      //   // circuit.passed = circuit.date.isSameOrBefore(fetcha.parse());
      //   return circuit;
      // });
      // circuits[circuits.findIndex(circuit => !circuit.passed)].upcoming = true;
      component.render(loaded(circuits, drivers));
    });
}

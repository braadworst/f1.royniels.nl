module.exports = (circuits, drivers) => {
  // circuits = circuits.map(circuit => {
  //   // circuit.date = fetcha.parse(circuit.date, 'DD-MM-YYYY');
  //   // circuit.passed = circuit.date.isSameOrBefore(fetcha.parse());
  //   return circuit;
  // });
  // circuits[circuits.findIndex(circuit => !circuit.passed)].upcoming = true;
  return [circuits, drivers];
}

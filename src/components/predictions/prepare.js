const parse    = require('date-fns/parse');
const isBefore = require('date-fns/is_before');
const format   = require('date-fns/format');

module.exports = (user, circuits, drivers) => {
  let upcoming = false;
  circuits = circuits.map(circuit => {
    const now  = parse(new Date());
    const date = parse(circuit.date);
    circuit.passed = isBefore(date, now);
    if (!isBefore(date, now) && !upcoming) {
      upcoming = true;
      circuit.upcoming = upcoming;
    }
    circuit.date = format(date, 'DD-MM-YYYY');
    return circuit;
  });

  return [user, circuits, drivers];
}

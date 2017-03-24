const format   = require('date-fns/format');
const parse    = require('date-fns/parse');
const isBefore = require('date-fns/is_before');

module.exports = (user, circuits, drivers, predictions) => {
  let upcoming = false;
  circuits = circuits.map(circuit => {
    const now  = parse(new Date());
    const date = parse(circuit.date);
    if (isBefore(now, date) && !upcoming) {
      upcoming = true;
      circuit.upcoming = upcoming;
    }
    circuit.passed = !isBefore(now, date);
    circuit.date   = format(circuit.date, 'DD-MM-YYYY HH:mm');
    return circuit;
  });

  return [user, circuits, drivers, predictions];
}

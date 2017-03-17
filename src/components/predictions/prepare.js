const parse    = require('date-fns/parse');
const isBefore = require('date-fns/is_before');
const format   = require('date-fns/format');

module.exports = (user, circuits, drivers, predictions) => {
  let upcoming = false;
  circuits = circuits.map(circuit => {
    const now  = parse(new Date());
    // const now  = '2017-03-26T06:01:00.000Z';
    const date = parse(circuit.date);
    circuit.passed = isBefore(circuit.date, now);
    if (!isBefore(circuit.date, now) && !upcoming) {
      upcoming = true;
      circuit.upcoming = upcoming;
    }
    circuit.date = format(date, 'DD-MM-YYYY HH:mm');
    return circuit;
  });

  return [user, circuits, drivers, predictions];
}

const format = require('date-fns/format');

module.exports = (user, circuits, drivers, predictions) => {
  let upcoming = false;
  circuits = circuits.map(circuit => {
    const now = format(new Date(), 'x');
    if (circuit.date > now && !upcoming) {
      upcoming = true;
      circuit.upcoming = upcoming;
    }
    circuit.date = format(circuit.date, 'DD-MM-YYYY HH:mm');
    return circuit;
  });

  return [user, circuits, drivers, predictions];
}

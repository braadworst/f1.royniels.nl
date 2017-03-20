const format = require('date-fns/format');

module.exports = statistics => {

  if (statistics && Array.isArray(statistics)) {
    statistics = statistics.map(stat => {
      stat.date = format(stat.date, 'DD-MM-YYYY HH:mm:ss');
      return stat;
    });
  }

  return [statistics];
}

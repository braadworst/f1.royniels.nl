const loaded   = require('./html/loaded');
const loading  = require('./html/loading');
const loader   = require('../../data/loader');
const moment   = require('moment');

module.exports = function() {

  return {
    async create(renderer, store) {
      try {
        renderer.render(loading());
        // let data = await loader('circuits', 'drivers', store);
      } catch (error) {
        console.log(error);
      }
      // const now = moment();
      //
      // // set parameters based on the current date
      // circuits = circuits.map(circuit => {
      //   return Object.assign(
      //     {},
      //     circuit,
      //     { passed : circuit.date.isSameOrBefore(now) }
      //   )
      // });
      //
      // // Set upcoming race
      // circuits[circuits.findIndex(circuit => !circuit.passed)].upcoming = true;

      // renderer.render(html({
      //   circuits,
      //   drivers
      // }));
    }
  }
}

const loading     = require('./html/loading');
const loaded      = require('./html/loaded');
const noResults   = require('./html/noResults');
const bulkRequest = require('../../data/bulkRequest');

module.exports = function() {

  return {
    async create(renderer, store) {
      try {
        renderer.render(loading());
        const { teams } = await bulkRequest('teams', store);
        if (teams.length) {
          renderer.render(loaded(teams), true);
        } else {
          renderer.render(noResults(), true);
        }
      } catch(errors) {
        console.log(errors)
      }
    }
  }
}

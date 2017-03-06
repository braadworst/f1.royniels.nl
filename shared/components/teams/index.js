const loading = require('./loading')();
const loaded  = require('./loaded');
const empty   = require('./empty')();
const failed  = require('./failed')();

module.exports = create => {
  create(async function(render, state) {
    try {
      render(loading);
      const teams = state.get('data.teams');
      if (teams.length) {
        render(loaded(teams));
      } else {
        render(empty);
      }
    } catch(errors) {
      render(failed);
    }
  });
}

const loading = require('./loading')();
const loaded  = require('./loaded');
const empty   = require('./empty')();
const failed  = require('./failed')();

module.exports = init => {
  return {
    create : init(async function(render, state) {
      console.log('Create team');
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
    })
  }
}

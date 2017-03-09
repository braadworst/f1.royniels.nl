const loading = require('./loading')();
const loaded  = require('./loaded');
const empty   = require('./empty')();
const failed  = require('./failed')();

module.exports = component => {
  component
    .data('teams', 'drivers', 'engines', 'chassis')
    .loading(() => component.render(loading))
    .failed(() => component.render(failed))
    .empty(() => component.render(empty))
    .loaded((teams, drivers, engines, chassis) => {

      // Happends when there is only one team
      // TODO, fix json api that this always gives back an array
      if (typeof teams === 'object') {
        teams = [teams];
      }

      teams = teams.map(team => {
        return {
          name         : team.name,
          firstDriver  : drivers.filter(row => row.id === team.firstDriverId).pop(),
          secondDriver : drivers.filter(row => row.id === team.secondDriverId).pop(),
          engine       : drivers.filter(row => row.id === team.engineId).pop(),
          chassis      : drivers.filter(row => row.id === team.chassisId).pop(),
        }
      });

      component.render(loaded(teams));
    })
}

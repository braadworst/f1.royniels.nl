const loading = require('./loading')();
const loaded  = require('./loaded');
const failed  = require('./failed')();

module.exports = component => {
  component
    .data('user', 'teams', 'drivers', 'engines', 'chassis')
    .loading(() => component.render(loading))
    .failed(() => component.render(failed))
    .loaded((user, teams, drivers, engines, chassis) => {

      teams = teams.map(team => {
        return {
          name         : team.name,
          user         : user.name,
          firstDriver  : drivers.filter(row => row.id === team.firstDriverId).pop(),
          secondDriver : drivers.filter(row => row.id === team.secondDriverId).pop(),
          engine       : engines.filter(row => row.id === team.engineId).pop(),
          chassis      : chassis.filter(row => row.id === team.chassisId).pop(),
        }
      });

      component.render(loaded(teams));
    })
}

const component   = require('../middleware/component');
const componentId = require('../middleware/componentId');
const paths       = require('../paths');

module.exports = router => {
  router
    .get(paths.teams, component('teams', '#main'))
    .get(paths.team, component('team', '#main'))
    .get(paths.teamEdit, componentId('team', '#main'))
    .get(paths.predictions, component('predictions', '#main'))
    .get(paths.standings, component('standings', '#main'))
    .get(paths.rules, component('rules', '#main'))
    .get(paths.results, component('results', '#main'))
}

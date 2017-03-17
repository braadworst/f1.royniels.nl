const component   = require('../middleware/component');
const componentId = require('../middleware/componentId');
const paths       = require('../paths');

const excludes = [
  paths.login,
  paths.logout,
  paths.githubConsent,
  paths.githubToken,
  paths.googleConsent,
  paths.googleToken,
  paths.facebookConsent,
  paths.facebookToken,
];

module.exports = router => {
  router
    .before(component('navigation', '#menu'), excludes)
    .get(paths.teams, component('teams', '#main'))
    .get(paths.team, component('team', '#main'))
    .get(paths.teamEdit, componentId('team', '#main'))
    .get(paths.predictions, component('predictions', '#main'))
    .get(paths.standings, component('standings', '#main'))
    .get(paths.rules, component('rules', '#main'))
    .get(paths.results, component('results', '#main'))
}

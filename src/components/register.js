module.exports = {
  navigation : {
    datasets : ['user', 'userTeams'],
    events   : require('./navigation/events'),
    loaded   : require('./navigation/loaded')
  },
  login : {
    loaded   : require('./login/loaded')
  },
  races : {
    datasets : ['circuits', 'drivers'],
    loading  : require('./races/loading'),
    loaded   : require('./races/loaded'),
    failed   : require('./races/failed'),
    prepare  : require('./races/prepare'),
  },
  rules : {
    loaded   : require('./rules/loaded')
  },
  standings : {
    loaded   : require('./standings/loaded')
  },
  teamNew : {
    datasets : ['user', 'drivers', 'engines', 'chassis'],
    loaded   : require('./teamNew/loaded'),
    loading  : require('./teamNew/loading'),
    failed   : require('./teamNew/failed'),
    events   : require('./teamNew/events'),
  },
  teams : {
    datasets : ['user', 'teams', 'drivers', 'engines', 'chassis'],
    prepare  : require('./teams/prepare'),
    loading  : require('./teams/loading'),
    loaded   : require('./teams/loaded'),
    failed   : require('./teams/failed'),
  }
}

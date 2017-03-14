module.exports = {
  navigation : {
    datasets : ['user', 'teamsByUser'],
    events   : require('./nav/events'),
    loaded   : require('./nav/loaded')
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
  teamCreate : {
    datasets : ['user', 'drivers', 'engines', 'chassis'],
    loaded   : require('./teamCreate/loaded'),
    loading  : require('./teamCreate/loading'),
    failed   : require('./teamCreate/failed'),
    events   : require('./teamCreate/events'),
  },
  teams : {
    datasets : ['user', 'teams', 'drivers', 'engines', 'chassis'],
    prepare  : require('./teams/prepare'),
    loading  : require('./teams/loading'),
    loaded   : require('./teams/loaded'),
    failed   : require('./teams/failed'),
  }
}

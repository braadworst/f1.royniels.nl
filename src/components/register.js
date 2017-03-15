module.exports = {
  navigation : {
    datasets : ['user', 'userTeams'],
    events   : require('./navigation/events'),
    loaded   : require('./navigation/loaded')
  },
  login : {
    loaded   : require('./login/loaded')
  },
  predictions : {
    datasets : ['user', 'circuits', 'drivers'],
    loading  : require('./predictions/loading'),
    loaded   : require('./predictions/loaded'),
    failed   : require('./predictions/failed'),
    prepare  : require('./predictions/prepare'),
    events   : require('./predictions/events'),
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

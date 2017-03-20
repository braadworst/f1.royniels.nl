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
    datasets : ['user', 'circuits', 'drivers', 'userPredictions'],
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
    datasets : ['standings'],
    loaded   : require('./standings/loaded'),
    failed   : require('./standings/failed'),
    prepare  : require('./standings/prepare'),
  },
  team : {
    datasets : ['user', 'drivers', 'engines', 'chassis', 'teamById'],
    loaded   : require('./team/loaded'),
    loading  : require('./team/loading'),
    failed   : require('./team/failed'),
    events   : require('./team/events'),
    prepare  : require('./team/prepare'),
  },
  teams : {
    datasets : ['teams'],
    loading  : require('./teams/loading'),
    loaded   : require('./teams/loaded'),
    failed   : require('./teams/failed'),
  },
  results : {
    datasets : ['user', 'drivers', 'circuits', 'results'],
    loaded   : require('./results/loaded'),
    events   : require('./results/events'),
    failed   : require('./results/failed'),
  },
  statistics : {
    datasets : ['statistics'],
    loaded   : require('./statistics/loaded'),
    prepare  : require('./statistics/prepare'),
  }
}

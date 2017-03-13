module.exports = {
  nav : {
    datasets : ['loggedInUser', 'teamsByUser'],
    events   : require('./nav/events'),
    loaded   : require('./nav/loaded')
  }
}

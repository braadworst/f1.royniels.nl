module.exports = {
  nav : {
    subscribe : ['loggedInUser', 'teamsByUser'],
    events : require('./nav/events'),
    loaded : require('./nav/loaded')
  }
}

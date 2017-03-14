module.exports = {
  login          : '/',
  logout         : '/logout',
  teams          : '/teams',
  teamCreate     : '/teams/create',
  teamEdit       : '/teams/edit/:id',
  standings      : '/standings',
  rules          : '/rules',
  races          : '/races',
  authentication : {
    github : {
      consent : '/auth/github',
      token   : '/auth/github/callback'
    },
    google : {
      consent : '/auth/google',
      token   : '/auth/google/callback'
    },
    facebook : {
      consent : '/auth/facebook',
      token   : '/auth/facebook/callback'
    }
  }
}

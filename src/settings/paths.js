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
      consent : '/authentication/github',
      token   : '/authentication/github/callback'
    },
    google : {
      consent : '/authentication/google',
      token   : '/authentication/google/callback'
    },
    facebook : {
      consent : '/authentication/facebook',
      token   : '/authentication/facebook/callback'
    }
  }
}

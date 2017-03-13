module.exports = {
  login          : '/',
  lougout        : '/logout',
  teams          : '/teams',
  teamCreate     : '/teams/create',
  teamEdit       : '/teams/edit/:id',
  standings      : '/standings',
  rules          : '/rules',
  races          : '/races',
  authentication : {
    github : {
      constent : '/authentication/github',
      token    : '/authentication/github/callback'
    },
    google : {
      constent : '/authentication/google',
      token    : '/authentication/google/callback'
    },
    facebook : {
      constent : '/authentication/facebook',
      token    : '/authentication/facebook/callback'
    }
  }
}

module.exports = {
  apps : [{
    name        : 'webserver',
    script      : './src/bootstrap/webserver.js',
    env: {
      'NODE_ENV': 'development',
    },
    env_production : {
       'NODE_ENV': 'production'
    }
  },{
    name       : 'apiserver',
    script     : './src/bootstrap/apiserver.js',
    env: {
      'NODE_ENV': 'development',
    },
    env_production : {
       'NODE_ENV': 'production'
    }
  }]
}

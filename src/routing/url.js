const paths = require('./paths');

module.exports = (function() {
  return {
    login(...params) {
      return merge(paths.LOGIN, params);
    },
    logout(...params) {
      return merge(paths.LOGOUT, params);
    },
    teams(...params) {
      return merge(paths.TEAMS, params);
    },
    teamDetail(...params) {
      return merge(paths.TEAM_DETAIL, params);
    },
    teamCreate(...params) {
      return merge(paths.TEAM_CREATE, params);
    },
    races(...params) {
      return merge(paths.RACES, params);
    },
    standings(...params) {
      return merge(paths.STANDINGS, params);
    },
    rules(...params) {
      return merge(paths.RULES, params);
    },
    results(...params) {
      return merge(paths.RESULTS, params);
    },
  }

  function merge(url, params) {
    return url
      .split('/')
      .map(e => {
        if (e.indexOf(':') === 0) {
          if (!params.length) {
            throw new Error(`You defined a new url, but didn't supply enough parameters`);
          }
          return params.shift();
        }
        return e;
      })
      .join('/');
  }
}());

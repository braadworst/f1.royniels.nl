const superagent = require('superagent');
const validator  = require('./validator');

module.exports = (function() {

  const base = 'https://localhost:4444/api/';

  return {
    get : {
      user             : (query) => find('users', query),
      drivers          : () => find('drivers'),
      chassis          : () => find('chassis'),
      engines          : () => find('engines'),
      circuits         : () => find('circuits'),
      teams            : () => find('teams'),
      team             : (query) => find('teams', query),
      userTeams        : (query) => find('teams', query),
      predictions      : (query) => find('predictions', query),
      points           : () => find('points'),
    },
    set : {
      user       : upsert('users'),
      team       : upsert('teams'),
      prediction : upsert('predictions'),
      result     : upsert('results'),
    }
  };

  function upsert(name) {
    return function(options) {
      return new Promise((resolve, reject) => {

        if (!options || options.record) {
          reject(new Error('When setting new data you need to supply at least the record option'));
          return;
        }

        const errors = validator(name, options.record);
        if (errors) {
          reject(errors);
          return;
        }

        superagent
          .put(base + name)
          .send(JSON.stringify(options))
          .end((error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response.body);
            }
          });
      });
    }
  }

  function find(name) {
    return function(options) {
      return new Promise((resolve, reject) => {
        superagent
          .get(base + name)
          .end((error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response.body);
            }
          });
      });
    }
  }
}());

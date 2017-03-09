const superagent = require('superagent');
const validator  = require('./validator');
const jsonapi    = require('./jsonapi');

module.exports = (function() {

  const base = 'https://localhost:4444/';

  return {
    get : {
      user        : find('users'),
      drivers     : find('drivers'),
      chassis     : find('chassis'),
      engines     : find('engines'),
      circuits    : find('circuits'),
      teams       : find('teams'),
      team        : find('teams'),
      myTeams     : find('teams'),
      predictions : find('predictions'),
      points      : find('points'),
    },
    set : {
      user        : upsert('users'),
      team        : upsert('teams'),
      predictions : upsert('predictions'),
      result      : upsert('results'),
    }
  };

  function upsert(name) {
    return function(record) {
      return new Promise((resolve, reject) => {
        const errors = validator(name, record);
        if (errors) {
          reject(errors);
          return;
        }
        superagent
          .post(base + name)
          .send(jsonapi.serialize(name, record))
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
        if (options && options.serialize) {
          options = options.serialize();
        }

        superagent
          .get(base + name)
          .query(options)
          .set('Content-Type', 'application/vnd.api+json')
          .end((error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(jsonapi.parse(response.body));
            }
          });
      });
    }
  }
}());

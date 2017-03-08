const djv        = require('djv');
const validator  = new djv();
const superagent = require('superagent');

// validator.addSchema(require('./schemas/teams'))
// validator.addSchema(require('./schemas/users'))
// validator.addSchema(require('./schemas/results'))
// validator.addSchema(require('./schemas/predictions'));

module.exports = (function() {

  const base = 'https://localhost:4444/api/';

  return {
    get : {
      drivers          : find('drivers'),
      chassis          : find('chassis'),
      engines          : find('engines'),
      circuits         : find('circuits'),
      teams            : find('teams'),
      team             : find('teams'),
      predictions      : find('predictions'),
      points           : find('points'),
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
        const errors = validator.validate(name, options.record);

        if (errors) {
          reject(errors);
          return;
        }

        superagent
          .put(base + name)
          .send(JSON.stringify(record))
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

const Ajv     = require('ajv');
const ajv     = new Ajv({ coerceTypes : true });
const request = require('request');
const schemas = {
  teams       : require('./schemas/teams'),
  users       : require('./schemas/users'),
  results     : require('./schemas/results'),
  predictions : require('./schemas/predictions'),
};

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
      user             : find('users'),
      predictions      : find('predictions'),
      points           : find('points'),
    },
    set : {
      teamUpsert       : upsert('team'),
      predictionUpsert : upsert('predictions'),
      results          : upsert('results'),
    }
  };

  function upsert(name) {
    return function(options) {
      return new Promise((resolve, reject) => {
        if (ajv.validate(schemas[name], record)) {
          request.put({
            uri  : base + name,
            body : JSON.stringify(record),
            json : true
          }, (error, response, body) => {
            if (error) {
              reject(error);
            } else {
              resolve(JSON.parse(body));
            }
          });
        } else {
          reject(ajv.errors);
        }
      });
    }
  }

  function find(name) {
    return function(options) {
      return new Promise((resolve, reject) => {
        console.log(base + name);
        request(base + name, (error, response, body) => {
          console.log('done');
          if (error) {
            reject(error);
          } else {
            resolve(JSON.parse(body));
          }
        });
      });
    }
  }
}());

const Ajv = require('ajv');
const ajv = new Ajv({ coerceTypes : true });
const request = require('request');
const schemas = {
  teams       : require('./schemas/teams'),
  users       : require('./schemas/users'),
  results     : require('./schemas/results'),
  predictions : require('./schemas/predictions'),
};

module.exports = function() {

  const base = 'https://localhost:4444/api/';

  return {
    drivers : {
      list() {
        return list('drivers');
      }
    },
    chassis : {
      list() {
        return list('chassis');
      }
    },
    engines : {
      list() {
        return list('engines');
      }
    },
    circuits : {
      list() {
        return list('circuits');
      }
    },
    teams : {
      list() {
        return list('teams');
      },
      findBy(column, value) {
        return findBy('teams', column, value);
      },
      upsert(record) {
        return upsert('teams', record);
      }
    },
    users : {
      findBy(column, value) {
        return findBy('users', column, value);
      },
      upsert(record) {
        return upsert('users', record);
      }
    },
    predictions : {
      findBy(column, value) {
        return findBy('predictions', column, value);
      },
      upsert(record) {
        return upsert('predictions', record);
      }
    },
    points : {
      list() {
        return list('points');
      }
    },
    results : {
      upsert(record) {
        return upsert('results');
      }
    }
  }

  function upsert(name, record) {
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

  function findBy(name, column, value) {
    return new Promise((resolve, reject) => {
      request(base + name + '/find/' + column + '/' + value, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  function list(name) {
    return new Promise((resolve, reject) => {
      request(base + name, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }
}

const superagent = require('superagent');
const validator  = require('./validator');
const jsonapi    = require('./jsonapi');
const logger     = require('minilog')('apiClient');
require('minilog').enable();

module.exports = () => {

  const domain = 'https://localhost:4444/';

  let cache = {};

  let exposed = {
    get : {
      drivers       : find('drivers'),
      chassis       : find('chassis'),
      engines       : find('engines'),
      circuits      : find('circuits'),
      teams         : find('teams'),
      predictions   : find('predictions'),
      points        : find('points'),
      userByToken   : find('users?filters[token]=$', 'user'),
      userByEmail   : find('users?filters[email]=$'),
      teamById      : find('teams/$'),
      userTeams     : depending('teams?filters[userId]=$'),
      user          : find('users?')
    },
    set : {
      user       : upsert('users'),
      team       : upsert('teams'),
      prediction : upsert('predictions'),
      result     : upsert('results'),
    },
    cache() {
      return cache;
    }
  };

  function dependers(key) {
    // Make all the calls that depend on the user id get the id
    if (key === 'user') {
      exposed.get.userTeams = exposed.get.userTeams(cache.user.id);
      console.log(exposed.get);
    }
  }

  function depending(path, key) {
    return function(...values) {
      return find(path, key, ...values);
    }
  }

  function find(path, key, ...values) {
    return async function(...values) {

      values.forEach(value => {
        if (Array.isArray(value) || typeof value === 'object') {
          throw new Error('Values supplied to the api need to be a number or string');
        }
      });

      let query = path.split('?').pop();
      path      = path.split('?').shift();

      // replace all params in path
      path      = path.replace(/\$/g, match => values.shift());
      query     = query.replace(/\$/g, match => values.shift());
      if (!key) {
        key = domain + path + '?' + query;
      }

      if (cache[key]) {
        logger.info(`Get from cache: ${ key }`);
        return cache[key];
        return;
      }

      return new Promise((resolve, reject) => {
        superagent
          .get(domain + path)
          .query(query)
          .set('Content-Type', 'application/vnd.api+json')
          .end((error, response) => {
            if (error) {
              reject(error);
            } else {
              cache[key] = jsonapi.parse(response.body);
              dependers(key);
              resolve(cache[key]);
            }
          });
      });
    }
  }

  function upsert(path) {
    return function(record) {
      return new Promise((resolve, reject) => {
        const errors = validator(path, record);
        if (errors) {
          reject(errors);
          return;
        }

        logger.info(`Do upsert request to: ${ domain }${ path }`);

        superagent
          .post(domain + path)
          .send(JSON.stringify(jsonapi.serialize(path, record)))
          .set('Content-Type', 'application/vnd.api+json')
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

  return exposed;
}

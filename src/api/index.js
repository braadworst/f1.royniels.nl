const superagent = require('superagent');
const validator  = require('./validator');
const jsonapi    = require('./jsonapi');
const logger     = require('minilog')('apiClient');
require('minilog').enable();

module.exports = domain => {

  if (!domain) {
    throw new Error('Please provide the domain for the api client');
  }

  let getters = {
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
    user          : user()
  };
  let setters = {
    user       : upsert('users'),
    team       : upsert('teams'),
    prediction : upsert('predictions'),
    result     : upsert('results'),
  }
  let cache     = {};
  let exposed   = {
    get(name, parameters) {
      if (!getters[name]) {
        throw new Error(`API: Cannot get ${ name }, method is not defined`);
      }
      return getters[name](parameters);
    },
    set(name, record) {
      if (!setters[name]) {
        throw new Error(`API: Cannot set ${ name }, method is not defined`);
      }
      return setters[name](record);
    },
    update(callback) {
      callbacks.update = callback;
    },
    getCache() {
      return cache;
    },
    setCache(serverCache = {}) {
      cache = serverCache;
    }
  };

  function dependers(key) {
    // Make all the calls that depend on the user id get the id
    if (key === 'user') {
      getters.userTeams = getters.userTeams(cache.user.id);
    }
  }

  function depending(path, key) {
    return function(...values) {
      return find(path, key, ...values);
    }
  }

  function user() {
    return async function() {
      return cache.user;
    }
  }

  function find(path, key, ...parameters) {
    return async function(...values) {
      // Merge carry over variables
      values = [...values, ...parameters];

      values.forEach(value => {
        if (Array.isArray(value) || typeof value === 'object') {
          throw new Error('Values supplied to the api need to be a number or string');
        }
      });

      let query = path.split('?').length > 1 ? path.split('?').pop() : '';
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

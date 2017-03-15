const superagent = require('superagent');
const validator  = require('./validator');
const jsonapi    = require('./jsonapi');

module.exports = domain => {

  if (!domain) {
    throw new Error('Please provide the domain for the api client');
  }

  let getters = {
    drivers         : find('drivers?sort=-price'),
    chassis         : find('chassis?sort=-price'),
    engines         : find('engines?sort=-price'),
    circuits        : find('circuits'),
    teams           : find('teams?sort=name'),
    predictions     : find('predictions'),
    points          : find('points?sort=-points'),
    userByToken     : find('users?filter[token]=$', 'user'),
    userByEmail     : find('users?filter[email]=$'),
    teamById        : find('teams/$'),
    userPredictions : depending('predictions?filter[userId]=$'),
    userTeams       : depending('teams?filter[userId]=$'),
    user            : user()
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
      dependers('user');
    }
  };

  function dependers(key) {
    // Make all the calls that depend on the user id get the id
    if (key === 'user') {
      cache.user = Array.isArray(cache.user) ? cache.user.pop() : cache.user;
      getters.userTeams       = getters.userTeams(cache.user.id);
      getters.userPredictions = getters.userPredictions(cache.user.id);
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

      // Cleanup, when no values are supplied, the default value is a array with undefined as a single value
      values     = values.filter(value => value);
      parameters = parameters.filter(parameter => parameter);

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

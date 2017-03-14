const superagent = require('superagent');
const validator  = require('./validator');
const jsonapi    = require('./jsonapi');

module.exports = (function() {

  const domain = 'https://localhost:4444/';

  let cache = {};

  return {
    get : {
      drivers       : find('drivers'),
      chassis       : find('chassis'),
      engines       : find('engines'),
      circuits      : find('circuits'),
      teams         : find('teams'),
      predictions   : find('predictions'),
      points        : find('points'),
      userByToken   : find('users?filters[token]=$'),
      userByEmail   : find('users?filters[email]=$'),
      teamById      : find('teams/$'),
      teamsByUser   : find('teams?filters[userId]=$'),
      user          : find('users?')
    },
    set : {
      users       : upsert('users'),
      teams       : upsert('teams'),
      predictions : upsert('predictions'),
      results     : upsert('results'),
    },
    cache() {
      return cache;
    }
  };

  function find(path) {
    return function(...values) {
      return new Promise((resolve, reject) => {

        values.forEach(value => {
          if (Array.isArray(value) || typeof value === 'object') {
            reject(new Error('Values supplied to the api need to be a number or string'));
          }
        });

        let query = path.split('?').pop();
        path      = path.split('?').shift();

        // replace all params in path
        path      = path.replace(/\$/g, match => values.shift());
        query     = query.replace(/\$/g, match => values.shift());
        const key = domain + path + '?' + query;
        console.log(key);
        if (cache[key]) {
          resolve(cache[key]);
          return;
        }

        superagent
          .get(domain + path)
          .query(query)
          .set('Content-Type', 'application/vnd.api+json')
          .end((error, response) => {
            if (error) {
              reject(error);
            } else {
              cache[key] = jsonapi.parse(response.body);
              resolve(cache[key]);
            }
          });
      });
    }
  }

  function upsert(name) {
    return function(record) {
      return new Promise((resolve, reject) => {
        const errors = validator(name, record);
        if (errors) {
          reject(errors);
          return;
        }
        superagent
          .post(domain + name)
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
}());

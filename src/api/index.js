const superagent = require('superagent');
const validator  = require('./validator');
const jsonapi    = require('./jsonapi');
const logger     = require('minilog')('apiClient');
require('minilog').enable();

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
      user       : upsert('users'),
      team       : upsert('teams'),
      prediction : upsert('predictions'),
      result     : upsert('results'),
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

        // console.log(cache);

        // if (cache[key]) {
        //   logger.info(`Get from cache: ${ key }`);
        //   resolve(cache[key]);
        //   return;
        // }
        //
        // logger.info(`Do find request to: ${ key }`);

        resolve([]);
        return;

        superagent
          .get(domain + path)
          .query(query)
          .set('Content-Type', 'application/vnd.api+json')
          .end((error, response) => {
            if (error) {
              reject(error);
            } else {
              // cache[key] = jsonapi.parse(response.body);
              resolve(jsonapi.parse(response.body));
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
}());

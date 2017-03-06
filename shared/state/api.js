const request = require('request');
const action  = require('../actions/data');

module.exports = function(store) {

  const base = 'https://localhost:4444/api/';

  return {
    drivers() {
      return dataset('drivers');
    },
    engines() {
      return dataset('engines');
    },
    chassis() {
      return dataset('chassis');
    },
    createTeam(data) {
      return new Promise((resolve, reject) => {
        request.post({
          uri     : base + 'teams',
          body    : JSON.stringify(data),
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        });
      });
    },
    createOrUpdateUser(data) {
      return new Promise((resolve, reject) => {
        request.post({
          uri  : base + 'users/create-or-update',
          body : JSON.stringify(data)
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        });
      });
    },
    findUser(data) {
      return new Promise((resolve, reject) => {
        request.post({
          uri  : base + 'users/find',
          body : JSON.stringify(data)
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        });
      });
    }
  }

  function dataset(name) {
    return new Promise((resolve, reject) => {
      store.dispatch(action.loading(name));
      request(base + name, (error, response, body) => {
        if (error) {
          store.dispatch(action.failed(name, error));
        } else {
          store.dispatch(action.loaded(name, JSON.parse(body)));
        }
      });
    });
  }
}

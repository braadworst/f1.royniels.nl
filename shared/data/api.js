const request = require('request');
const action  = require('../actions/data');

module.exports = (function() {

  const base      = 'https://localhost:4444/api/';
  const loginBase = 'https://localhost:4443/';

  return {
    dataset(dataset) {
      return new Promise((resolve, reject) => {
        request(base + dataset, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(JSON.parse(body));
          }
        });
      });
    },
    login(path) {
      return new Promise((resolve, reject) => {
        request.get({
          uri : loginBase + path,
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        });
      });
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
    findOrCreateUser(data) {
      return new Promise((resolve, reject) => {
        request.post({
          uri  : base + 'users/find-or-create',
          body : json.stringify(data)
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
}());

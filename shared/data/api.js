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
    findUserByEmail(data) {
      return new Promise((resolve, reject) => {
        request.get({
          uri  : base + 'users/find-by-email',
          body : json.stringify(data)
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        });
      });
    },
    findUserByToken(data) {
      return new Promise((resolve, reject) => {
        request.get({
          uri  : base + 'users/find-by-token',
          body : json.stringify(data)
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        });
      });
    },
    createUser(data) {
      return new Promise((resolve, reject) => {
        request.put({
          uri  : base + 'users',
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

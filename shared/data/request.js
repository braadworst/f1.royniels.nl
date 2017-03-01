const request = require('request');
const action  = require('../actions/data');

module.exports = (function() {

  const base = 'https://localhost:4444/api/';

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
    }
  }

}());

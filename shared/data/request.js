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
      request({
        uri     : base + 'team',
        body    : JSON.stringify(data),
        method  : 'post',
        headers : {
          'Content-Type' : 'application/vnd.api+json'
        }
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(body));
        }
      });
    }
  }

}());

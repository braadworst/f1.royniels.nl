const request  = require('request');

module.exports = (function() {

  const base = 'https://localhost:4444/api/';

  return {
    drivers(resolve, reject) {
      request(base + 'drivers', (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(body));
        }
      });
    }
  }

}());

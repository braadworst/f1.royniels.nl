const moment = require('moment');

module.exports = (function() {

  return {
    getCookies(request) {
      let headerCookies = request.headers.cookie ? request.headers.cookie.split(';') : [];
      cookies = {};

      headerCookies.forEach(function( cookie ) {
        const parts = cookie.split('=');
        cookies[parts.shift().trim()] = decodeURI(parts.join('='));
      });

      return cookies;
    },
    set(response, key, value) {
      response.setHeader('Set-Cookie', [
        key + '=' + value,
        'Secure',
        'SameSite=Strict',
        'Expires=' + moment().utc().add(1, 'day').toString(),
        'Domain=localhost',
        'Path=/'
      ].join('; '));
    },
    unset(response, key) {
      response.setHeader('Set-Cookie', [
        key + '=',
        'Secure',
        'SameSite=Strict',
        'Expires=' + moment().utc().subtract(1, 'day').toString(),
        'Domain=localhost',
        'Path=/'
      ].join('; '));
    }
  }
}());

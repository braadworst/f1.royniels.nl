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
      let tomorrow = new Date();
      tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1)).toUTCString();

      response.setHeader('Set-Cookie', [
        key + '=' + value,
        'Secure',
        'SameSite=Strict',
        'Expires=' + tomorrow,
        'Domain=localhost',
        'Path=/'
      ].join('; '));
    },
    unset(response, key) {
      let yesterday = new Date();
      yesterday = new Date(yesterday.setDate(yesterday.getDate() + 1)).toUTCString();

      response.setHeader('Set-Cookie', [
        key + '=',
        'Secure',
        'SameSite=Strict',
        'Expires=' + yesterday,
        'Domain=localhost',
        'Path=/'
      ].join('; '));
    }
  }
}());

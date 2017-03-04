module.exports = function() {

  return {
    getCookies() {
      let headerCookies = request.headers.cookie : '';
      cookies = {};

      headerCookies.forEach(function( cookie ) {
        const parts = cookie.split('=');
        cookies[parts.shift().trim()] = decodeURI(parts.join('='));
      });

      return cookies;
    },
    write(response, key, value) {
      response.setHeader('Set-Cookie', [
        key + '=' + value,
        'Secure',
        'SameSite=Strict',
        'Max-Age=' + 60 * 60 * 24
      ].join('; '));
    }
  }
}

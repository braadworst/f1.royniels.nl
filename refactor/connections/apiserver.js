const superagent = require('superagent');

module.exports = domain => {
  if (!domain) {
    throw new Error('Please provide the domain for the api client');
  }

  // Add trailing slash if not there
  domain = domain[domain.length - 1] !== '/' ? domain + '/' : domain;

  function get(path, ...queryNames) {
    return function(...queryValues) {
      return new Promise((resolve, reject) => {
        superagent
          .get(domain + path)
          .query(queryParameters(queryNames, queryValues))
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

  function queryParameters(names, values) {
    if (names.length > values.length) {
      throw new Error(`Not all query parameters have been set, need values for ${ names.join(', ') }`);
    }

    let output = {};

    names.forEach(name => output[name] = values.shift());

    return output;
  }

  return {
    userByToken : get('users', 'filter[token]')
  };
}

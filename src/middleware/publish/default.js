const superagent = require('superagent');

module.exports = async function(request, response, next, relay) {

  const component = relay.component;
  const data      = relay.data;
  const domain    = relay.settings.apiDomain;

  try {
    const data = await call();
    next({ data });
  } catch (error) {
    next({ error });
  }

  function call() {
    return new Promise((resolve, reject) => {
      superagent
        .get(domain + path)
        .query(query)
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

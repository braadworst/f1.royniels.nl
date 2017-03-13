module.exports = (request, response, next) => {

  let template = require('../templates/default');
  if (request.url === '/') {
    template = require('../templates/login');
  }

  next({
    components : require('../components'),
    renderer   : require('../renderer')(template)
  });
}

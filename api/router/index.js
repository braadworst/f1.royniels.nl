const bodyParser = require('body-parser');
const handlers   = {
  create   : require('./handlers/create'),
  response : require('./handlers/response'),
  errors   : require('./handlers/errors'),
  get      : require('./handlers/get'),
  post     : require('./handlers/post'),
};
const parsers = {
  jsonapi : require('./parsers/jsonapi'),
  url     : require('./parsers/url'),
};
const validators = {
  body    : require('./validators/body'),
  request : require('./validators/request'),
};
const serializers = {
  jsonapi : require('./serializers/jsonapi')
};

module.exports = function(server, database) {
  const router = require('cs-router')(server);

  router
    .before((request, response, next) => next({ database }))
    .before(validators.request)
    .before(parsers.url)
    .before(bodyParser.json())
    .before(parsers.jsonapi)
    .before(validators.body)
    .get('/init', handlers.create)
    .get('/drivers', handlers.get)
    .get('/drivers/:id', handlers.get)
    .get('/teams', handlers.get)
    .get('/teams/:id', handlers.get)
    .get('/users', handlers.get)
    .get('/users/:id', handlers.get)
    .get('/drivers', handlers.get)
    .get('/drivers/:id', handlers.get)
    .get('/chassis', handlers.get)
    .get('/chassis/:id', handlers.get)
    .get('/engines', handlers.get)
    .get('/engines/:id', handlers.get)
    .get('/predictions', handlers.get)
    .get('/points', handlers.get)
    .post('/users', handlers.post)
    .post('/teams', handlers.post)
    .post('/predictions', handlers.post)
    .post('/results', handlers.post)
    .after(serializers.jsonapi)
    .after(handlers.response)
    .noMatch(handlers.errors.notFound);
}

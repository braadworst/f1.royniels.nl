const settings        = require('./settings')();
const redux           = require('redux');
const spdy            = require('spdy');
const express         = require('express');
const compression     = require('compression');
const app             = express();
const router          = require('../shared/helpers/router');
const constants       = require('../shared/constants');
const createStore     = require('../shared/helpers/store');
const action          = require('../shared/actions/component');

// Enable compression on all responses
app.use(compression());

// Setting up statics
app.use(express.static('./public'));

// Declare your routes here
app.get(constants.url.URL_HOME, (request, response) => handle(request, response, 'home'));
app.get(constants.url.URL_LOGIN, (request, response) => handle(request, response, 'login'));
app.get(constants.url.URL_LOGOUT, (request, response) => handle(request, response, 'logout'));
app.get(constants.url.URL_REGISTER, (request, response) => handle(request, response, 'register'));
app.get(constants.url.URL_TEAMS, (request, response) => handle(request, response, 'teams'));
app.get(constants.url.URL_TEAM_DETAIL, (request, response) => handle(request, response, 'teamDetail'));
app.get(constants.url.URL_TEAM_CREATE, (request, response) => handle(request, response, 'teamCreate'));
app.get(constants.url.URL_RACES, (request, response) => handle(request, response, 'races'));
app.get(constants.url.URL_STANDINGS, (request, response) => handle(request, response, 'standings'));
app.get(constants.url.URL_RULES, (request, response) => handle(request, response, 'rules'));

let server = spdy.createServer(settings.options, app);

server.listen(settings.port, function() {
  console.log('Server listening on port: ' + settings.port);
});

function handle(request, response, method) {
  let store      = createStore();
  let template   = require('./template');
  let renderer   = require('./renderer')(template);
  let components = require('../shared/components')(store);
  components.init(renderer);

  // Add components here that you want to be loaded on every page, things like
  // menu and footer, etc
  store.dispatch(action.create('componentNav'));

  router[method](store, Object.assign({}, { path : request.path }, request.params));
  renderer.addState(store.getState());
  response.end(renderer.getTemplate());
}

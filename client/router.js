const page      = require('page');
const router    = require('../shared/helpers/router');
const constants = require('../shared/constants');

module.exports = function(store) {

  // Declare your routes here
  page(constants.url.URL_HOME, (request) => handle('home', request));
  page(constants.url.URL_LOGIN, (request) => handle('login', request));
  page(constants.url.URL_LOGOUT, (request) => handle('logout', request));
  page(constants.url.URL_REGISTER, (request) => handle('register', request));
  page(constants.url.URL_TEAMS, (request) => handle('teams', request));
  page(constants.url.URL_TEAM_DETAIL, (request) => handle('teamDetail', request));
  page(constants.url.URL_TEAM_CREATE, (request) => handle('teamCreate', request));
  page(constants.url.URL_RACES, (request) => handle('races', request));
  page(constants.url.URL_STANDINGS, (request) => handle('standings', request));
  page(constants.url.URL_RULES, (request) => handle('rules', request));

  function handle(method, request) {
    router[method](store, Object.assign({}, { path : request.path }, request.params));
  }

  page({ dispatch : false });
}

const page      = require('page');
const router    = require('../shared/helpers/router');
const constants = require('../shared/constants');

module.exports = function(store) {

  // Declare your routes here
  page(constants.url.URL_HOME, (request) => handle('home', request));
  page(constants.url.URL_DETAIL, (request) => handle('detail', request));

  function handle(method, request) {
    router[method](store, Object.assign({}, { path : request.path }, request.params));
  }

  page({ dispatch : false });
}

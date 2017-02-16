const componentAction  = require('../actions/component');
const menuActiveAction = require('../actions/menuActive');
const url              = require('../helpers/url');

// Add calls to this shared router to the store, when you want to activate a
// new component on an url change.
module.exports = (function() {
  return {
    home(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentHome' ));
      store.dispatch(menuActiveAction.active(params.path));
    },
    detail(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentDetail' ));
      store.dispatch(menuActiveAction.active(params.path));
    }
  }
}());

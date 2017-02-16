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
    login(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentLogin' ));
      store.dispatch(menuActiveAction.active(params.path));
    },
    logout(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentLogout' ));
      store.dispatch(menuActiveAction.active(params.path));
    },
    register(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentRegister' ));
      store.dispatch(menuActiveAction.active(params.path));
    },
    teams(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentTeams' ));
      store.dispatch(menuActiveAction.active(params.path));
    },
    teamDetail(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentTeamDetail' ));
      store.dispatch(menuActiveAction.active(params.path));
    },
    teamCreate(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentTeamCreate' ));
      store.dispatch(menuActiveAction.active(params.path));
    },
    races(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentRaces' ));
      store.dispatch(menuActiveAction.active(params.path));
    },
    standings(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentStandings' ));
      store.dispatch(menuActiveAction.active(params.path));
    },
    rules(store, params) {
      store.dispatch(componentAction.create('componentPageSwitcher', 'componentRules' ));
      store.dispatch(menuActiveAction.active(params.path));
    },
  }
}());

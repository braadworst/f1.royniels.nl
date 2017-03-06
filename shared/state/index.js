const watch   = require('redux-watch');
const redux   = require('redux');
const watched = {};
const actions = {
  component  : require('./actions/component'),
  createTeam : require('./actions/createTeam'),
  data       : require('./actions/data'),
  menuActive : require('./actions/menuActive')
}

module.exports = function(preloadedState) {

  const store = redux.createStore(
      redux.combineReducers({
        data      : require('../reducers/data'),
        component  : require('../reducers/component'),
        menuActive : require('../reducers/menuActive')
      }),
      preloadedState
    );
  }

  return {
    unwatch(name) {
      if (!watched[name]) {
        throw new Error(`${ name } ins't watched by the state`);
      }
      watched[name]();
      delete watched[name];
    },
    watch(name, callback) {
      const watcher = watch(store.getState, name);
      watched[name] = store.subscribe(watcher(callback));
    },
    get(name) {
      return store.getState(name);
    },
    dispatch(...parameters) {

    }
  }
}

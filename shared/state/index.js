const watch   = require('redux-watch');
const redux   = require('redux');
const actions = require('./actions');

module.exports = (function(preloadedState) {

  let watched = {};

  const store = redux.createStore(
    redux.combineReducers({
      data       : require('./reducers/data'),
      menuActive : require('./reducers/menuActive')
    }),
    preloadedState
  );

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
      output = store.getState();

      if (!name || typeof name !== 'string') {
        return output;
      }

      name.split('.').forEach(key => {
        if (!output[key]) {
          throw new Error(`State cannot get the values for key ${ key }`);
        };
        output = output[key];
      });

      return output;
    },
    dispatch(...parameters) {
      const actionName = parameters.shift();

      if (!actionName) {
        throw new Error(`When you want to dispatch an action, you need to specify a name`);
      }

      actions[actionName](parameters);
    }
  }
}());

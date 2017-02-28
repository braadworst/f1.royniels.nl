const redux = require('redux');
const thunk = require('redux-thunk').default;

// Add new actions to this store helper, this is used once on the client and
// on every new request that is made to the server.
module.exports = function(preloadedState = {}) {
  return redux.createStore(
    redux.combineReducers({
      drivers    : require('../reducers/drivers'),
      component  : require('../reducers/component'),
      menuActive : require('../reducers/menuActive')
    }),
    preloadedState,
    redux.applyMiddleware(thunk)
  );
}

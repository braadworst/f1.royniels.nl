const redux = require('redux');

// Add new actions to this store helper, this is used once on the client and
// on every new request that is made to the server.
module.exports = function(preloadedState = {}) {
  return redux.createStore(
    redux.combineReducers({
      component  : require('../reducers/component'),
      menuActive : require('../reducers/menuActive')
    }),
    redux.applyMiddleware({
      thunk : require('redux-thunk')
    })
    preloadedState
  );
}

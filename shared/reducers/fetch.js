const constants = require('../constants');
const initial   = {
  loading : {},
  failed  : {},
  data    : {}
}

module.exports = function(state = initial, action) {
  switch(action.type) {
    case constants.fetch.FETCH_LOADING :
    case constants.fetch.FETCH_FAILED :
    case constants.fetch.FETCH_LOADED :
      return Object.assign({}, state, action );
    default :
      return state;
  }
}

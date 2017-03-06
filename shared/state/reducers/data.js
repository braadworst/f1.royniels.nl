const constants = require('../constants');
const initial   = {
  loading : {},
  failed  : {},
  data    : {}
}

module.exports = function(state = initial, action) {
  let output;
  switch(action.type) {
    case constants.data.DATA_ALL_LOADED :
      return Object.assign({}, state, action);
    case constants.data.DATA_LOADING :
      output = Object.assign({}, state);
      output.loading[action.dataset] = true;
      return output;
    case constants.data.DATA_FAILED :
      output = Object.assign({}, state);
      output.loading[action.dataset] = false;
      output.failed[action.dataset]  = action.error;
      return output;
    case constants.data.DATA_LOADED :
      output = Object.assign({}, state);
      output.loading[action.dataset] = false;
      output.data[action.dataset]    = action.records;
      return output;
    default :
      return state;
  }
}

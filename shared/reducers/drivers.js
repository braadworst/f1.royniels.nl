const constants = require('../constants');
const initial   = {
  records : [],
  isFetching : false
}

module.exports = function(state = initial, action) {
  switch(action.type) {
    case constants.drivers.GET_DRIVERS :
      return Object.assign({}, state, { active : action.active });
    case constants.drivers.GET_DRIVERS_SUCCESS :
      return Object.assign({}, state, { records : action.records });
    case constants.drivers.GET_DRIVERS_ERROR :
      return Object.assign({}, state, { error : action.error });
    default :
      return state;
  }
}

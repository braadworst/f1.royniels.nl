const constants = require('../constants');
const initial   = {
  component : false,
  page      : false
}

module.exports = function(state = initial, action) {
  switch(action.type) {
    case constants.component.COMPONENT_INIT :
    case constants.component.COMPONENT_REMOVED :
    case constants.component.COMPONENT_ADDED :
    case constants.component.COMPONENT_CREATE :
    case constants.component.COMPONENT_LOADING :
      return Object.assign({}, state, action);
    default :
      return state;
  }
}

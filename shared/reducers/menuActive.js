const constants = require('../constants');
const initial   = {
  active : '/'
}

module.exports = function(state = initial, action) {
  switch(action.type) {
    case constants.menu.MENU_ACTIVE :
      return Object.assign({}, state, action);
    default :
      return state;
  }
}

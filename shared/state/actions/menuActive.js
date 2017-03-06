const constants = require('../constants');

module.exports = (function() {
  return {
    active(active) {
      return {
        type : constants.menu.MENU_ACTIVE,
        active
      }
    }
  }
}());

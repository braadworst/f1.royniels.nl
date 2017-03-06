const constants = require('../constants');

module.exports = (function() {
  return {
    init(name, page = false) {
      return {
        type : constants.component.COMPONENT_INIT,
        name,
        page
      }
    },
    create(name, page = false) {
      return {
        type : constants.component.COMPONENT_CREATE,
        name,
        page
      }
    },
    removed(name, page = false) {
      return {
        type : constants.component.COMPONENT_REMOVED,
        name,
        page
      }
    },
    added(name, page = false) {
      return {
        type : constants.component.COMPONENT_ADDED,
        name,
        page
      }
    }
  }
}());

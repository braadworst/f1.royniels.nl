const constants = require('../constants');

module.exports = (function() {
  return {
    init(component, page = false) {
      return {
        type : constants.component.COMPONENT_INIT,
        component,
        page
      }
    },
    create(component, page = false) {
      return {
        type : constants.component.COMPONENT_CREATE,
        component,
        page
      }
    },
    removed(component, page = false) {
      return {
        type : constants.component.COMPONENT_REMOVED,
        component,
        page
      }
    },
    added(component, page = false) {
      return {
        type : constants.component.COMPONENT_ADDED,
        component,
        page
      }
    }
  }
}());

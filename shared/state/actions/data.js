const constants = require('../constants');

module.exports = (function() {
  return {
    allLoaded(allLoaded) {
      return {
        type : constants.data.DATA_ALL_LOADED,
        allLoaded
      }
    },
    loading(dataset) {
      return {
        type : constants.data.DATA_LOADING,
        dataset,
      }
    },
    loaded(dataset, records) {
      return {
        type : constants.data.DATA_LOADED,
        dataset,
        records
      }
    },
    failed(dataset, error) {
      return {
        type : constants.data.DATA_FAILED,
        error,
      }
    }
  }
}());

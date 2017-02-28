const constants = require('../constants');

module.exports = (function() {
  return {
    loading(dataset) {
      return {
        type : constants.fetch.FETCH_LOADING,
        dataset,
      }
    },
    loaded(dataset, records) {
      return {
        type : constants.fetch.FETCH_LOADED,
        dataset,
        records
      }
    },
    failed(dataset, error) {
      return {
        type : constants.fetch.FETCH_FAILED,
        error,
      }
    }
  }
}());

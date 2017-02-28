const constants = require('../constants');
const fetch     = require('../data/fetch');

module.exports = (function() {
  return {
    fetchLoading(dataset) {
      return {
        type : constants.drivers.FETCH_LOADING,
        dataset,
      }
    }
    fetchLoaded(dataset, records) {
      return {
        type : constants.drivers.FETCH_LOADED,
        dataset,
        records
      }
    }
    fetchError(dataset, error) {
      return {
        type : constants.drivers.FETCH_FAILED,
        error,
      }
    }
  }
}());

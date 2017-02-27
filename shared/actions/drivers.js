const constants = require('../constants');
const fetch     = require('isomorphic-fetch');
const settings  = require('package-settings');

module.exports = (function() {
  return {
    fetchDrivers(store) {
      if (shouldLoad(store)) {
        return store.dispatch(fetchRecords(store));
      } else {
        return Promise.resolve();
      }
    }
  }
}());

function fetchRecords(store) {
  store.dispatch(fetchDriversPending());
  return fetch(settings.apiUri + 'drivers')
    .then(records => {
      store.dispatch(fetchDriversSuccess(records));
    }, error => {
      store.dispatch(fetchDriversError(error.message));
    });
}

function shouldLoad(store) {
  const records    = store.getState().drivers.records;
  const isFetching = store.getState().drivers.isFetching;
  return (records.length || isFetching) ? false : true;
}

function fetchDriversPending() {
  return {
    type : constants.drivers.GET_DRIVERS_PENDING,
    isFetching : true
  }
}

function fetchDriversSuccess(records) {
  return {
    type : constants.drivers.GET_DRIVERS_SUCCESS,
    records,
    isFetching : false
  }
}

function fetchDriversError(error) {
  return {
    type : constants.drivers.GET_DRIVERS_ERROR,
    error,
    isFetching : false
  }
}

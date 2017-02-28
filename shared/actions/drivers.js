const constants = require('../constants');
const fetch     = require('../fetch');

module.exports = (function() {
  return {
    fetchDrivers
  }
}());

function fetchDrivers() {
  return (dispatch, getState) => {
    if (shouldFetch(getState)) {
      return dispatch(fetchRecords(dispatch));
    } else {
      return Promise.resolve();
    }
  }
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

function shouldFetch(getState) {
  const records    = getState().drivers.records;
  const isFetching = getState().drivers.isFetching;
  return (records.length || isFetching) ? false : true;
}

function fetchRecords(dispatch) {
  return dispatch => {
    dispatch(fetchDriversPending());
    return new Promise((resolve, reject) => {
      fetch.drivers(records => {
        resolve(records);
      }, error => {
        reject(error);
      });
    });
  }
}

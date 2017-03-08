module.exports = function(state = {}, action) {
  switch(action.type) {
    case 'dataFailed'  :
    case 'dataLoading' :
    case 'dataLoaded'  :
      const settings = {
        error   : action.error,
        status  : action.status,
        records : action.records
      };
      return Object.assign({}, state, { [action.name] : settings });
    default :
      return state;
  }
}

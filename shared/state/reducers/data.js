module.exports = function(state = {}, action) {
  switch(action.type) {
    case 'dataSaved'   :
    case 'dataSaving'  :
    case 'dataNotSaved'  :
      return Object.assign({}, state, { save : record(action) });
    case 'dataNotLoaded'  :
    case 'dataLoading' :
    case 'dataLoaded'  :
      return Object.assign({}, state, { load : record(action) });
    default :
      return state;
  }

  function record(action) {
    return {
      [action.name] : {
        error   : action.error,
        status  : action.status,
        records : action.records
      }
    }
  }
}

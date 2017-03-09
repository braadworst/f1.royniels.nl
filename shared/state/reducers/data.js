const initial = {
  load : {},
  save : {}
}

module.exports = function(state = initial, action) {
  let output;
  switch(action.type) {
    case 'dataSaved'   :
    case 'dataSaving'  :
    case 'dataNotSaved'  :
      output = Object.assign({}, state);
      output.save[action.name] = record(action);
      return output;
    case 'dataNotLoaded'  :
    case 'dataLoading' :
    case 'dataLoaded'  :
      output = Object.assign({}, state);
      output.load[action.name] = record(action);
      return output;
    default :
      return state;
  }

  function record(action) {
    return {
      error   : action.error,
      status  : action.status,
      records : action.records
    }
  }
}

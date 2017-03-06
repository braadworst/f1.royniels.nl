const initial   = {
  loading : {},
  failed  : {},
  data    : {}
}

module.exports = function(state = initial, action) {
  let output;
  switch(action.type) {
    case 'dataLoading' :
      output = Object.assign({}, state);
      output.loading[action.name] = true;
      return output;
    case 'dataFailed' :
      output = Object.assign({}, state);
      output.loading[action.name] = false;
      output.failed[action.name]  = action.error;
      return output;
    case 'dataLoaded' :
      output = Object.assign({}, state);
      output.loading[action.name] = false;
      output.data[action.name]    = action.records;
      return output;
    default :
      return state;
  }
}

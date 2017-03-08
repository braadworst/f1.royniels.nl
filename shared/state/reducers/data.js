module.exports = function(state = {}, action) {
  switch(action.type) {
    case 'dataFailed'  :
    case 'dataLoading' :
    case 'dataLoaded'  :
      return Object.assign({}, state, { [action.name] : action });
    default :
      return state;
  }
}

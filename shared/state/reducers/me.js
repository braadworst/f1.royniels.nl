module.exports = function(state = {}, action) {
  switch(action.type) {
    case 'me' :
      return Object.assign({}, state, action);
    default :
      return state;
  }
}

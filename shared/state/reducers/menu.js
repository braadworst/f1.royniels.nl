const initial   = {
  active : '/'
}

module.exports = function(state = initial, action) {
  switch(action.type) {
    case 'active' :
      return Object.assign({}, state, action);
    default :
      return state;
  }
}

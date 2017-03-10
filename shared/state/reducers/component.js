const initial   = {
  active : '/'
}

module.exports = function(state = initial, action) {
  switch(action.type) {
    case 'componentAdded' :
    case 'componentRemoved' :
    case 'componentReady' :
      return Object.assign({}, state, action);
    default :
      return state;
  }
}

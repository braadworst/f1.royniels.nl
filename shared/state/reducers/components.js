const initial   = {
  active : '/'
}

module.exports = function(state = initial, action) {
  switch(action.type) {
    case 'componentCreate' :
    case 'componentLoading' :
    case 'componentLoaded' :
    case 'componentReady' :
    case 'componentRemoved' :
    case 'componentFailed' :
    case 'componentSettings' :
      return Object.assign({}, state, action);
    default :
      return state;
  }
}

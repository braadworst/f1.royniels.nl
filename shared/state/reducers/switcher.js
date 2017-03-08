const initial   = {
  page : undefined
}

module.exports = function(state = initial, action) {
  switch(action.type) {
    case 'switch' :
      return Object.assign({}, state, action);
    default :
      return state;
  }
}

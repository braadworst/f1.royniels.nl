const initial   = {
  active : '/'
}

module.exports = function(state = initial, action) {
  switch(action.type) {
    case 'menuActive' :
      return Object.assign({}, state, { active : action.active });
    default :
      return state;
  }
}

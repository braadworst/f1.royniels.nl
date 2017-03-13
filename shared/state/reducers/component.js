const initial   = {
  name     : undefined,
  settings : undefined
};

module.exports = function(state = initial, action) {
  switch(action.type) {
    case 'create' :
    case 'loading' :
    case 'loaded' :
    case 'ready' :
    case 'removed' :
    case 'failed' :
    case 'settings' :
      return Object.assign({}, state, action);
    default :
      return state;
  }
}

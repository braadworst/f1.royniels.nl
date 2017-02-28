const watch     = require('redux-watch');
const action    = require('./actions/drivers');

module.exports = function(...parameters) {
  const types    = [].slice.call(parameters);
  const callback = parameters.pop();

  if (!callback) {
    throw new Error('Please define a callback for the loader');
  }

  if (!types.length) {
    throw new Error('You need to specify data types for the loader');
  }

  function fetch(type) {
    let watcher = watch(store.getState, type);
    unsubscribe = store.subscribe(watcher(data => {

    }));
  }
}

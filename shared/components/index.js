const watch      = require('redux-watch');
const constants  = require('../constants');

module.exports = function(store) {

  // Register new components in this singular location, we use this list to trigger
  // callbacks like added, init, create and remove
  const components = {
    componentNav          : require('./nav')(),
    componentPageSwitcher : require('./pageSwitcher')(),
    componentHome         : require('./home')(),
    componentDetail       : require('./detail')(),
  }

  return {
    init(renderer) {
      let watcher = watch(store.getState, 'component');

      store.subscribe(watcher((state) => {
        if (!components[state.component]) {
          console.log(`Component hasn't been registered yet: ${state.component}`);
          return;
        }

        if (components[state.component][state.type]) {
          components[state.component][state.type](renderer, store);
        }
      }));
    },
    list() {
      return Object.keys(components);
    }
  }
}

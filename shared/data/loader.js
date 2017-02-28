const watch  = require('redux-watch');
const fetch  = require('./fetch');
const action = require('../actions/fetch');
const sets   = {};

module.exports = function(...parameters) {

  parameters     = [].slice.call(parameters);
  const store    = parameters.pop();
  const datasets = parameters;
  const id       = parameters.join('-');

  // Add to global sets so we can dispatch when all data on a page is loaded
  store.dispatch(action.allLoaded(false));
  sets[id] = { loaded : false };

  if (!store) {
    throw new Error('Please set the store as last element for the dataset loader');
  }

  if (!datasets.length) {
    throw new Error('You need to specify datasets for the loader');
  }

  return new Promise((resolve, reject) => {
    (async function(){
      let errors = [];
      let output = {};
      let max    = datasets.length - 1;
      for (let i = 0; i < max; i++) {
        const dataset = datasets[i];
        store.dispatch(action.loading(dataset));
        try {
          // Get from cache first
          let records = store.getState().fetch.data[dataset];
          if (records === undefined) {
            records = await fetch.dataset(dataset);
          }
          store.dispatch(action.loaded(dataset, records));
          output[dataset] = records;
        } catch (error) {
          store.dispatch(action.failed(dataset, error));
          errors.push({ dataset, error });
        }
      }
      if (errors.length) {
        reject(errors);
      } else {
        sets[id].loaded = true;
        allLoaded();
        resolve(output);
      }
    }());
  });

  function allLoaded() {
    const loaded = Object
      .keys(sets)
      .filter(key => sets[key].loaded);

    if (loaded.length === sets.length) {
      store.dispatch(action.allLoaded(true));
    }
  }
}

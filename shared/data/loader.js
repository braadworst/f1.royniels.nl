const watch  = require('redux-watch');
const fetch  = require('./fetch');
const action = require('../actions/fetch');

module.exports = function(...parameters) {

  parameters     = [].slice.call(parameters);
  const store    = parameters.pop();
  const datasets = parameters;

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
      while (datasets.length) {
        const dataset = datasets.pop();
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
          console.log(error);
          store.dispatch(action.failed(dataset, error));
          errors.push({ dataset, error });
        }
      }
      if (errors.length) {
        reject(errors);
      } else {
        resolve(output);
      }
    }());
  });
}

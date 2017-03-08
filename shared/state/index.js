const watch   = require('redux-watch');
const redux   = require('redux');
const actions = require('./actions');
const api     = require('../api');

module.exports = function(preloadedState) {

  let watched = {};

  const store = redux.createStore(
    redux.combineReducers({
      data : require('./reducers/data'),
      menu : require('./reducers/menu')
    }),
    preloadedState
  );

  const exposed = {
    preloaded() {
      return store.getState();
    },
    unwatch(name) {
      if (!watched[name]) {
        throw new Error(`${ name } ins't watched by the state`);
      }
      watched[name]();
      delete watched[name];
    },
    watch(name, callback) {
      const watcher = watch(store.getState, name);
      watched[name] = store.subscribe(watcher(data => {
        callback(data);
      }));
    },
    set(name) {

    },
    get(name) {
      return new Promise((resolve, reject) => {
        (async function(){
          if (!name || typeof name !== 'string') {
            reject(new Error('Please provide a name for the data you want to get'));
            return;
          }

          const data = store.getState().data[name];

          if (data) {
            switch (data.status) {
              case 'failed' :
                reject(data.error);
                break;
              case 'loaded' :
                resolve(data.records);
                break;
              case 'loading' :
                exposed.watch('data.' + name, data => {
                  if (data.status === 'loaded') {
                    resolve(data.records);
                  } else if (data.status) {
                    reject(data.error);
                  }
                  exposed.unwatch('data.' + name);
                });
                break;
            }
          } else {
            console.log('loading');
            store.dispatch(actions.dataLoading(name));
            try {
              console.log('get records');
              const records = await api.get[name]();
              console.log(records);
              store.dispatch(actions.dataLoaded(name, records));
              resolve(records);
            } catch (error) {
              console.log(error);
              store.dispatch(actions.dataFailed(name, error));
              reject(error);
            }
          }
        }());
      });
    },
    dispatch(...parameters) {
      const actionName = parameters.shift();

      if (!actionName) {
        throw new Error(`When you want to dispatch an action, you need to specify a name`);
      }

      store.dispatch(actions[actionName](...parameters));
    }
  }

  return exposed;
};

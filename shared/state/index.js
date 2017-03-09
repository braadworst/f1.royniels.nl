const watch   = require('redux-watch');
const redux   = require('redux');
const actions = require('./actions');
const api     = require('../api');
const query   = require('../api/query');

module.exports = function(preloadedState) {

  let watched = {};

  const store = redux.createStore(
    redux.combineReducers({
      data : require('./reducers/data'),
      menu : require('./reducers/menu'),
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
    save(name, record) {
      return new Promise((resolve, reject) => {
        if (!record) {
          reject(new Error('Saving a record requires both a name and record argument'));
          return;
        }
        (async function() {
          const state         = store.getState().data.save[name];
          const stateFullName = 'data.save.' + name;
          if (state) {
            status(state, stateFullName, resolve, reject);
          } else {
            store.dispatch(actions.dataSaving(name));
            try {
              const record = await api.set[name](record);
              store.dispatch(actions.dataSaved(name, record));
              resolve(record);
            } catch (error) {
              store.dispatch(actions.dataNotSaved(name, error));
              reject(error);
            }
          }
        });
      });
    },
    data(name) {
      return new Promise((resolve, reject) => {
        (async function() {
          if (!name || typeof name !== 'string') {
            reject(new Error('Please provide a name for the data you want to get'));
            return;
          }

          // first check if it is data or a regular state element
          if (store.getState()[name]) {
            resolve(store.getState()[name]);
            return;
          }

          const state         = store.getState().data.load[name];
          console.log(store.getState().data, name);
          const stateFullName = 'data.load.' + name;
          if (state) {
            status(state, stateFullName, resolve, reject);
          } else {
            store.dispatch(actions.dataLoading(name));
            try {
              const records = await api.get[name](await querystring(name));
              store.dispatch(actions.dataLoaded(name, records));
              resolve(records);
            } catch (error) {
              store.dispatch(actions.dataNotLoaded(name, error));
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

  function status(state, stateFullName, resolve, reject) {
    switch (state.status) {
      case 'completed' :
        resolve(state.records);
        break;
      case 'failed' :
        reject(state.error);
        break;
      case 'progress' :
        exposed.watch(stateFullName, data => {
          if (data.status === 'completed') {
            resolve(data.records);
          } else if (data.status === 'failed') {
            reject(data.error);
          }
          exposed.unwatch(stateFullName);
        });
        break;
    }
  }

  // TODO have a look if we can smoothen this process
  async function querystring(name) {
    switch(name) {
      case 'myTeams' :
        const user = await exposed.data('user');
        return query().filter('userId', user.id).fields('teams', 'id', 'name');
      default :
        return '';
    }
  }

  return exposed;
};

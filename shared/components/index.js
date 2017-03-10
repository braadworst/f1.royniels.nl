module.exports = function(state, renderer) {
  console.log(state);
  let registered = {};

  require('./register').forEach(component => {
    register(component.name, component.code);
  });

  function register(name, code) {
    registered[name] = component(name);
    code(registered[name].exposed);
  }

  function getComponent(name) {
    if (!registered[name]) {
      throw new Error(`Component ${ name } hasn't been registered`);
    }
    return registered[name].triggers;
  }

  // Watch for change events to the state
  state.watch('componentCreate', async function(data) {
    try {
      const component = getComponent(data.name);
      state.dispatch('componentLoading', data.name);
      await component.loading();
      await component.data();
      await component.loaded();
      state.dispatch('componentLoaded', data.name);
    } catch (error) {
      await component.failed();
      state.dispatch('componentFailed', data.name, error);
    }
  });

  state.watch('componentReady', async function(data) {
    const component = getComponent(data.name);
    component.ready();
  });

  state.watch('componentRemoved', async function(data) {
    const component = getComponent(data.name);
    component.removed();
  });

  function component(componentName) {
    let exposed = {}, triggers = {}, callbacks = {}, datasets = {}, datasetNames = [];

    // callbacks that need to be set by the user in the component
    ['loading', 'loaded', 'removed', 'ready', 'failed'].forEach(callbackName => {
      triggers[callbackName] = async function() {
        if (callbacks[callbackName]) {
          // Convert datasets to array
          await callbacks[callbackName](...Object.keys(datasets).map(key => datasets[key]));
        }
      }
      exposed[callbackName] = (callback) => {
        callbacks[callbackName] = callback;
        return exposed;
      }
    });

    // Data callback, different footprint but also called by user
    triggers.data = async function() {
      for (let name of datasetNames) {
        datasets[name] = await state.data(name);
      }
    }

    exposed.data = (...names) => {
      datasetNames = [...datasetNames, ...names];
      return exposed;
    }

    // Util functions for within the component
    const utils = {
      render(html) {
        renderer.render(html);
        return exposed;
      },
      save(name, record) {
        return state.save(name, record);
      },
      watch(name, callback) {
        state.watch(name, callback);
        return exposed;
      },
      unwatch(name) {
        state.unwatch(name);
        return exposed;
      },
      create(name, ...settings) {
        state.dispatch('componentSettings', name, settings);
        state.dispatch('componentCreate', name);
      },
      settings() {
        return state.get('componentSettings')[componentName];
      },
      redirect(path) {
        state.dispatch('routerRedirect', path);
      }
    }

    return {
      exposed : Object.assign({}, exposed, utils),
      triggers
    }
  }

  return {
    create(name, ...settings) {
      state.dispatch('componentSettings', name, settings);
      state.dispatch('componentCreate', name);
    }
  }
}

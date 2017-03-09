module.exports = function(renderer, state) {

  let registered = {};

  require('./register').forEach(component => {
    register(component.name, component.code);
  });

  function exists(name) {
    if (!registered[name]) {
      throw new Error(`Component ${ name } hasn't been registered`);
    }
  }

  async function initialize(name, settings) {
    exists(name);
    const component = registered[name].component(settings);
    try {
      component.loading();
      const datasets = await component.data();
      if (datasets && datasets.filter(dataset => Array.isArray(dataset) && dataset.length > 0).length === 0) {
        component.empty();
      }
      await component.loaded();
    } catch (error) {
      component.failed(error);
    }
  }

  function register(name, code) {
    registered[name] = component();
    return code(registered[name].exposed());
  }

  function component() {
    let callbacks = {}, datasetNames = [], datasets = [], watch = [], unwatch = [], settings = [];
    const component = {
      data : async function() {
        datasets = [];
        for (let name of datasetNames) {
          datasets.push(await state.get(name));
        }
      },
      loading() {
        if (callbacks.loading) {
          callbacks.loading();
        }
      },
      loaded : async function() {
        if (callbacks.loaded) {
          await callbacks.loaded(...datasets);
        }
      },
      empty() {
        if (callbacks.empty) {
          callbacks.empty();
        }
      },
      failed(error) {
        if (callbacks.failed) {
          callback.failed(error);
        }
      },
      ready() {
        if (callbacks.ready) {
          callbacks.ready(...datasets);
        }
      },
      removed() {
        if (callbacks.removed) {
          callbacks.removed();
        }
      }
    }

    return {
      exposed() {
        const exposed = {
          data(...names) {
            datasetNames = [...datasetNames, ...names];
            return exposed;
          },
          loading(callback) {
            callbacks.loading = callback;
            return exposed;
          },
          loaded(callback) {
            callbacks.loaded = callback;
            return exposed;
          },
          empty(callback) {
            callbacks.empty = callback;
            return exposed;
          },
          failed(callback) {
            callbacks.failed = callback;
            return exposed;
          },
          ready(callback) {
            callbacks.ready = callback;
            return exposed;
          },
          removed(callback) {
            callbacks.removed = callback;
            return exposed;
          },
          render(html) {
            renderer.render(html);
            return exposed;
          },
          save(name, record) {
            return exposed;
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
            return initialize(name, settings);
          },
          options() {
            return settings;
          },
          state(name) {
            return state.state(name);
          }
        }
        return exposed;
      },
      component(newSettings) {
        settings = newSettings;
        return component;
      }
    }
  }

  // Listen for dom event changes
  if (renderer.ready) {
    renderer.ready(name => {
      exists(name);
      registered[name].component().ready();
    });
  }

  if (renderer.removed) {
    renderer.removed(name => {
      exists(name);
      registered[name].component().removed();
    });
  }

  // Run for the first time so all the added handlers run for serverside rendered
  // templates
  if (renderer.initialize) {
    renderer.initialize();
  }

  return {
    create(name, ...settings) {
      return initialize(name, settings);
    }
  }
}

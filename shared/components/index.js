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

  async function initialize(name) {
    exists(name);
    const component = registered[name].component();
    try {
      component.loading();
      await component.data();
      component.loaded();
    } catch (error) {
      console.log(error);
      component.failed(error);
    }
  }

  function register(name, code) {
    registered[name] = component();
    return code(registered[name].exposed());
  }

  function component() {
    let callbacks = {}, names = [], datasets = [];
    const component = {
      data : async function() {
        datasets = [];
        for (let name of names) {
          datasets.push([]);
          // datasets.push(await state.get(name));
        }
      },
      loading() {
        if (callbacks.loading) {
          callbacks.loading();
        }
      },
      loaded() {
        if (callbacks.loaded) {
          callbacks.loaded(...datasets);
        }
      },
      failed(error) {
        if (callbacks.failed) {
          callback.failed(error);
        }
      },
      ready() {
        if (callbacks.ready) {
          callbacks.ready();
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
          data(...newNames) {
            names = newNames;
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
          }
        }
        return exposed;
      },
      component() {
        return component;
      }
    }
  }

  // Listen for dom event changes
  if (renderer.added) {
    renderer.added(name => {
      exists(name);
      registered[name].ready();
    });
  }

  if (renderer.removed) {
    renderer.removed(name => {
      exists(name);
      registered[name].removed();
    });
  }

  // Run for the first time so all the added handlers run for serverside rendered
  // templates
  if (renderer.initialize) {
    renderer.initialize();
  }

  return {
    create(name) {
      return initialize(name);
    }
  }
}

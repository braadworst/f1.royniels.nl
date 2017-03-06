module.exports = function(renderer, state) {

  let methods = {
    create  : {},
    added   : {},
    removed : {}
  }

  function register(name, component) {
    methods.create[name] = method();
    methods.added[name] = method();
    methods.removed[name] = method();
    component(methods.create[name], methods.added[name], methods.removed[name]);
  }

  function handle(type, name) {
    if (methods[type][name]) {
      return methods[type][name]();
    } else {
      console.warn(`No ${ type } method registed for: ${name}`);
    }
  }

  function method() {
    return async function(callback) {
      try {
        await callback(renderer.render, state, handle);
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  // Listen for dom event changes
  if (renderer.added) {
    renderer.added(name => {
      handle('create', name);
    });
  }

  if (renderer.removed) {
    renderer.removed(name => {
      handle('removed', name);
    });
  }

  // Run for the first time so all the added handlers run for serverside rendered
  // templates
  if (renderer.initialize) {
    renderer.initialize();
  }

  // We have to explicitly call the register on every component, browiserify doesn't
  // work with dynamic requires, which makes sense. Might look into a automated
  // process later.
  register('nav', require('./nav'));
  register('login', require('./login'));
  register('teams', require('./teams'));
  register('teamCreate', require('./teamCreate'));
  register('races', require('./races'));
  register('standings', require('./standings'));
  register('rules', require('./rules'));

  return {
    create(name) {
      handle('create', name);
    },
    added(name) {
      handle('added', name);
    },
    removed(name) {
      handle('removed', name);
    }
  }
}

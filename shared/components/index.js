module.exports = function(render, state) {

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

  function method() {
    return async function(callback) {
      try {
        await callback(render, state);
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  // We have to explicitly call the register on every component, browiserify doesn't
  // work with dynamic requires, which makes sense. Might look into a automated
  // process later.
  register('nav', require('./nav'));
  register('pageSwitcher', require('./pageSwitcher'));
  register('login', require('./login'));
  register('logout', require('./logout'));
  register('teams', require('./teams'));
  register('teamCreate', require('./teamCreate'));
  register('races', require('./races'));
  register('standings', require('./standings'));
  register('rules', require('./rules'));

  return {
    create(name) {
      if (create[name]) {
        return create[name]();
      } else {
        console.warn(`No create method registed for: ${name}`);
      }
    },
    added(name) {
      if (added[name]) {
        return added[name]();
      } else {
        console.warn(`No added method registed for: ${name}`);
      }
    },
    removed(name) {
      if (removed[name]) {
        return removed[name]();
      } else {
        console.warn(`No removed method registed for: ${name}`);
      }
    }
    list() {
      return Object.keys(components);
    }
  }
}

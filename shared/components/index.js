module.exports = function(state) {

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
    init(renderer) {
      state.watch('component', (component) => {
        if (methods[component.type][component.name]) {
          console.log(`Component: ${ component.name } (${ component.type})`);
          methods[component.type][component.name]();
        } else {
          console.log(`Component hasn't been registered yet: ${component.name}`);
        }
      });
    },
    list() {
      return Object.keys(components);
    }
  }
}

module.exports = () => {

  let defaults, components = [], directories;

  function title(id) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function path(id) {
    return '/' + id;
  }

  const exposed = {
    directories(defined) {
      directories = defined;
      return exposed;
    },
    defaults(defined) : {
      defaults = defined;
      return exposed;
    },
    component(component) {

      if (!component || typeof component !== 'object') {
        throw new Error('Component not defined or not an object');
      }

      if (!component.id) {
        throw new Error('Please provide an id for your component');
      }

      if (!component.path) {
        component.path = path(component.id);
      }

      if (!component.title) {
        component.title = title(component.id);
      }

      components.push(component);

      return exposed;
    }
  }

  return exposed;
}

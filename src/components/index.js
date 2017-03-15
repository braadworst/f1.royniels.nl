module.exports = (components) => {

  if (!components) {
    throw new Error('Please add the configuration for the components that you want to use');
  }

  let registered = components;
  let subscriptions = {};
  let callbacks = {
    subscribe : false,
    render    : false,
    remove    : false,
  }

  function subscribe(dataset, name) {
    if (!subscriptions[dataset]) {
      subscriptions[dataset] = [];
    }
    subscriptions[dataset].push(name);
  }

  function unsubscribe(name) {
    Object
      .keys(subscriptions)
      .forEach(key => {
        const dataset = subscriptions[key];

        const index = subscriptions[dataset].indexOf(name);
        if (index > -1) {
          subscriptions[dataset].splice(index, 1);
        }
      });
  }

  function template(name, template, placeholder, data = []) {
    if (!callbacks.render) {
      throw new Error('Please make sure you attach a callback for render');
    }
    if (typeof callbacks.render !== 'function') {
      throw new Error('The callback dom render is not a function');
    }
    if (!placeholder) {
      throw new Error('Please supply a placeholder for the component you want to create');
    }
    if (typeof placeholder !== 'string') {
      throw new Error(`The supplied placeholder for component ${ name } is not a string ${ placeholder }`);
    }
    if(template) {
      callbacks.render(template(...data), placeholder);
    }
  }

  async function fetch(datasets, name) {
    if (!callbacks.fetch) {
      throw new Error('Please provide a callback for fetching data');
    }
    if (typeof callbacks.fetch !== 'function') {
      throw new Error('The callback for fetch has to be of type function');
    }
    let output = [];
    if (datasets) {
      for(const dataset of datasets) {
        output.push(await callbacks.fetch(dataset));
        subscribe(dataset, name);
      }
    }
    return output;
  }

  function exists(name) {
    if (!registered[name]) {
      throw new Error(`Component with name ${ name } is not registered`);
    }
    return registered[name];
  }

  function ready(name) {
    if (components[name] && components[name].events) {
      components[name].events();
    }
  }

  function remove(name) {
    if (!callbacks.remove) {
      throw new Error(`Could not remove ${ name }, no remove callback defined`);
    }
    if (typeof callbacks.remove !== 'function') {
      throw new Error('Callback remove needs to be of type function');
    }
    callbacks.remove(name);
  }

  function prepare(component, data = []) {
    if (component.prepare) {
      return component.prepare(...data);
    }
    return data;
  }

  const exposed = {
    create : async function(name, placeholder) {
      const component = exists(name);
      try {
        template(name, component.loading, placeholder);
        let data = await fetch(component.datasets, name);
        data = prepare(component, data);
        template(name, component.loaded, placeholder, data);
      } catch (error) {
        console.log('COMPONENTS', error);
        template(name, component.failed, placeholder);
      }
    },
    remove(name) {
      if (name) {
        exists(name)
        remove(name);
        unsubscribe(name);
      } else {
        Object
          .keys(registered)
          .forEach(name => {
            exists(name)
            remove(name);
            unsubscribe(name);
          });
      }
    },
    fetch(callback) {
      callbacks.fetch = callback;
    },
    update(dataset) {
      console.log('updated data!');
      // TODO implement
    },
    render(callback) {
      callbacks.render = callback;
    },
    ready(name) {
      ready(name);
    },
    remove(callback) {
      callbacks.remove = callback;
    }
  }

  return exposed;
}

module.exports = function() {

  let registered;
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
    if (!callbacks.domRender) {
      throw new Error('Please make sure you attach a callback for domRender');
    }
    if (typeof callbacks.domRender !== 'function') {
      throw new Error('The callback dom render is not a function');
    }
    if (!placeholder) {
      throw new Error('Please supply a placeholder for the component you want to create');
    }
    if (typeof placeholder !== 'string') {
      throw new Error(`The supplied placeholder for component ${ name } is not a string ${ placeholder }`);
    }
    if(!template) {
      console.warn(`Could not render a template for component ${ name }`);
    }
    callbacks.domRender(template(...data), placeholder);
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

  function ready(component) {
    if (component.events) {
      component.events();
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

  const exposed = {
    create : async function(name, placeholder) {
      try {
        const component = exists(name);
        template(name, component.loading, placeholder);
        const data = await data(component.datasets, name);
        template(name, component.loaded, placeholder, data);
      } catch (error) {
        console.log(error);
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
    register(components) {
      registered = components;
    },
    data : {
      fetch(callback) {
        callbacks.fetch = callback;
      },
      update(dataset) {
        // TODO implement
      },
    },
    template : {
      render(callback) {
        callbacks.render = callback;
      },
      ready(name) {
        ready(exists(name));
      },
      remove(callback) {
        callbacks.remove = callback;
      }
    }
  }

  return exposed;
}

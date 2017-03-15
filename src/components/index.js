module.exports = (components, api, renderer) => {

  if (!components) {
    throw new Error('Please add the configuration for the components that you want to use');
  }

  if (!api) {
    throw new Error('Please supply an api that the components can use to gather data');
  }

  if (!api.get) {
    throw new Error('The components can only work with an api that has a public method "get"');
  }

  if (!renderer) {
    throw new Error('Please supply a renderer that the components can use to render the contents');
  }

  if (!renderer.render) {
    throw new Error('The components can only work with an renderer that has a public method "render"');
  }

  if (renderer.ready) {
    renderer.ready(name => {
      if (components[name] && components[name].events) {
        components[name].events();
      }
    });
  }

  function render(name, template, placeholder, data = []) {
    if (!renderer.render) {
      throw new Error('Please make sure you attach a callback for render');
    }
    if (typeof renderer.render !== 'function') {
      throw new Error('The callback dom render is not a function');
    }
    if (!placeholder) {
      throw new Error('Please supply a placeholder for the component you want to create');
    }
    if (typeof placeholder !== 'string') {
      throw new Error(`The supplied placeholder for component ${ name } is not a string ${ placeholder }`);
    }
    if(template) {
      renderer.render(template(...data), placeholder);
    }
  }

  async function get(datasets, name) {
    if (!api.get) {
      throw new Error('Please provide a callback for fetching data');
    }
    if (typeof api.get !== 'function') {
      throw new Error('The callback for fetch has to be of type function');
    }
    let output = [];
    if (datasets) {
      for(const dataset of datasets) {
        output.push(await api.get(dataset));
        // subscribe(dataset, name);
      }
    }
    return output;
  }

  function exists(name) {
    if (!components[name]) {
      throw new Error(`Component with name ${ name } is not registered`);
    }
    return components[name];
  }

  function prepare(component, data = []) {
    if (component.prepare) {
      return component.prepare(...data);
    }
    return data;
  }

  return {
    create : async function(name, placeholder) {
      const component = exists(name);
      try {
        render(name, component.loading, placeholder);
        let data = await get(component.datasets, name);
        data = prepare(component, data);
        render(name, component.loaded, placeholder, data);
      } catch (error) {
        console.log('COMPONENTS', error);
        render(name, component.failed, placeholder);
      }
    }
  }

  // let subscriptions = {};
  //
  // function subscribe(dataset, name) {
  //   if (!subscriptions[dataset]) {
  //     subscriptions[dataset] = [];
  //   }
  //   subscriptions[dataset].push(name);
  // }
  //
  // function unsubscribe(name) {
  //   Object
  //     .keys(subscriptions)
  //     .forEach(key => {
  //       const dataset = subscriptions[key];
  //
  //       const index = subscriptions[dataset].indexOf(name);
  //       if (index > -1) {
  //         subscriptions[dataset].splice(index, 1);
  //       }
  //     });
  // }
}

module.exports = function() {

  let registered;
  let callbacks = {
    dataSubscribe  : false,
    dataUnsubsribe : false,
    domRender      : false,
    domReady       : false,
    domRemoved     : false,
  }
  let subscriptions = {};

  function subscribe(dataset, component) {
    if (!subscriptions[name]) {
      subscriptions[dataset] = [];
    }
    subscriptions[dataset] = component;
  }

  function unsubscribe(dataset, component) {
    const index = subscriptions[dataset].indexOf(component);
    if (index > -1) {
      subscriptions[dataset].splice(index, 1);
    }
  }

  function template(template, data = []) {
    if (callbacks.domRender && template) {
      callbacks.domRender(template(...data));
    }
  }

  async function data(subscribers, name) {
    let output = [];
    if (callbacks.dataSubscribe && Array.isArray(subscribers)) {
      for(const dataset of subscribers) {
        output.push(await callbacks.dataSubscribe(dataset));
        subscribe(dataset, name);
      }
    }
    return output;
  }

  const exposed = {
    create : async function(name, placeholder) {
      try {
        if (!registered[name]) {
          throw new Error(`Component with name ${ name } is not registered`);
        }
        const component = registered[name];
        template(component.loading);
        const data = await data(component.subscribe, name);
        template(component.loaded, data);
      } catch (error) {
        console.log(error);
        template(component.failed);
      }
    },
    register(components) {
      registered = components;
    },
    dataSubscribe(callback) {
      callbacks.dataSubscribe = callback;
    },
    domRender(callback) {
      callbacks.domRender = callback;
    }
  }

  return exposed;
}

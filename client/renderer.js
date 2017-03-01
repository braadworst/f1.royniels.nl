const camelize      = require('camelize');
const decamelize    = require('decamelize');
const morphdom      = require('morphdom');
const action        = require('../shared/actions/component');

module.exports = function(store) {

  let registeredComponents = {};

  return {
    init(component) {
      component
        .list()
        .forEach(type => {
          let domComponent = document.querySelector(decamelize(type, '-'));
          if (domComponent && domComponent.children.length) {
            registeredComponents[decamelize(type, '-')] = true;
            let options = {};
            if (store && store.getState() && store.getState().component && store.getState().component.options) {
              options = store.getState().component.options;
            }
            store.dispatch(action.init(type, options));
          }
        });
    },
    render(component, loadedComponent = false) {
      // Convert the string to HTML, fucked up shit dom strings :S
      let wrapper = document.createElement('div');
      wrapper.innerHTML = component.trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1');
      component = wrapper.firstChild;

      // Get the current container on the page
      let currentComponent = document.querySelector(component.tagName);

      // We will add an element at the end of the component so we can be sure
      // that when the added hooks is called the whole component is loaded, there
      // is no proper way to see when the whole component has been added to the
      // dom with morphdom, performance gain I guess
      // We will only do this for the loaded component, loading and error don't
      // need any triggers
      if (currentComponent && loadedComponent) {

        let loaded = document.createElement('div');
        loaded.classList.add('component-loaded');
        component.appendChild(loaded);

        morphdom(currentComponent, component, {
          onNodeAdded(node) {
            if (typeof node === 'object' && node.tagName && node.classList.contains('component-loaded')) {
              let name = node.parentNode.tagName.toLowerCase();
              if (!registeredComponents[name]) {
                registeredComponents[name] = true;
                store.dispatch(action.added(camelize(name)));
              }
            }
          }
        });
      } else if (currentComponent) {
        morphdom(currentComponent, component, {
          onNodeDiscarded(node) {
            if (node.tagName && registeredComponents[node.tagName.toLowerCase()]) {
              let name = node.tagName.toLowerCase();
              delete registeredComponents[name];
              store.dispatch(action.removed(camelize(name)));
            }
          }
        });
      }
    }
  }
}

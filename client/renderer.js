module.exports = (function(renderer) {

  let registered = {}, removed, added;

  function prepare(html) {
    // Convert the string to HTML, fucked up shit dom strings :S
    let wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1');
    return wrapper.firstChild;
  }

  function addLoaderElement(html) {
    // We will add an element at the end of the component so we can be sure
    // that when the added hooks is called the whole component is loaded, there
    // is no proper way to see when the whole component has been added to the
    // dom with morphdom, performance gain I guess
    // We will only do this for the loaded component, loading and error don't
    // need any triggers
    let loaded = document.createElement('div');
    loaded.classList.add('component-loaded');
    html.appendChild(loaded);

    return html;
  }

  function addPlaceholder(parent, component) {
    // We cannot really remove an element from the dom, otherwise we wouldn't
    // know where to place it next time, so we will insert an empty placeholder
    // element
    let placeholder = document.createElement(component.nodeName);
    document.setAttribute('id', component.getAttribute('id'));

    // TODO checkout if appending to the end, causes for problems, for now it is
    // fine because our pages are only shown one at the time.
    parent.appendChild(placeholder);
  }

  return {
    initialize(componentName = 'component') {
      const components = [].slice.call(document.querySelectorAll(`[id^="${ componentName }"]`));
      components.forEach(component => {
        const name = component.getAttribute('id')
        registered.push(name);
        added(name);
      });
    },
    added(callback) {
      added = callback;
    },
    removed(callback) {
      removed = callback;
    },
    render(newHtml) {

      newHtml     = prepare(newHtml);
      currentHtml = addLoaderElement(document.querySelector(newHTML.getAttribute('id')));

      morphdom(currentHtml, newHtml, {
        onNodeDiscarded(node) {
          if (node.getAttribute('id') && registered[node.getAttribute('id')]) {
            addPlaceholder(node.parentNode, node);
            const name = node.getAttribute('id');
            delete registered[name];
            removed(name);
          }
        },
        onNodeAdded(node) {
          if (typeof node === 'object' && node.tagName && node.classList.contains('component-loaded')) {
            const name = node.parentNode.getAttribute('id');
            if (!registeredComponents[name]) {
              registeredComponents[name] = true;
              added(name);
            }
          }
        }
      });
    }
  }
}());

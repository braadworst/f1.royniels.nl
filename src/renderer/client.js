module.exports = function() {

  let placeholders = {};
  let callbacks = {
    ready : false
  }

  function addObserver(placeholder) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach(node => {
            if (node.getAttribute && node.getAttribute('id')) {
              if (!callbacks.ready) {
                throw new Error('No callback added for the renderer ready callback');
              }
              if (typeof callbacks.ready !== 'function') {
                throw new Error('Renderer ready callback needs to be of type function');
              }
              callbacks.ready(node.getAttribute('id'));
            }
          })
        }
      });
    });

    // pass in the target node, as well as the observer options
    observer.observe(document.querySelector(placeholder), { childList : true, subtree : false });

    placeholders[placeholder] = observer;
  }

  function removeObserver(placeholder) {
    if (placeholders[placeholder]) {
      placeholders[placeholder].disconnect();
      delete placeholders[placeholder];
    }
  }

  const exposed = {
    init () {
      const components = [].slice.call(document.querySelectorAll('[id]'));
      components.forEach(component => {
        if (callbacks.ready) {
          callbacks.ready(component.getAttribute('id'));
        }
      });
    },
    ready(callback) {
      callbacks.ready = callback;
    },
    render(html, placeholder) {
      if (!document.querySelector(placeholder)) {
        throw new Error(`Trying to render, but could not find placeholder ${ placeholder }`);
      }
      exposed.remove(placeholder);
      if (!placeholders[placeholder]) {
        addObserver(placeholder);
      }
      document.querySelector(placeholder).innerHTML = html;
    },
    remove(placeholder) {
      if (!document.querySelector(placeholder)) {
        throw new Error(`Trying to remove, but could not find placeholder ${ placeholder }`);
      }
      removeObserver(placeholder);
      document.querySelector(placeholder).innerHTML = '';
    }
  }

  return exposed;
};

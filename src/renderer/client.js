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
            if (node.getAttribute('id')) {
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

    placeholder[placeholder] = observer;
  }

  function removeObserver(placeholder) {
    placeholder[placeholder].disconnect();
    delete placeholder[placeholder];
  }

  return {
    ready(callback) {
      callbacks.ready = callback;
    },
    render(placeholder, html) {
      if (!palceholders[placeholder]) {
        addObserver(placeholder);
      }
      if (!document.querySelector(placeholder)) {
        throw new Error(`Trying to render, but could not find placeholder ${ placeholder }`);
      }
      document.querySelector(placeholder).innerHTML = html;
    },
    clear(placeholder) {
      if (!document.querySelector(placeholder)) {
        throw new Error(`Trying yo remove, but could not find placeholder ${ placeholder }`);
      }
      removeObserver(placeholder);
      document.querySelector(placeholder).innerHTML = '';
    }
  }
};

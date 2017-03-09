const morphdom = require('morphdom');
const uuid     = require('uuid/').v4;

module.exports = (function(renderer) {

  let removed, ready;

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.removedNodes) {
        mutation.removedNodes.forEach(node => {
          if (node.getAttribute('id')) {
            removed(node.getAttribute('id'));
          }
        })
      }
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach(node => {
          if (node.getAttribute('id')) {
            // TODO: Dirty fix to wait for the children being loaded
            setTimeout(function() {
              ready(node.getAttribute('id'));
            }, 500);
          }
        })
      }
    });
  });

  // pass in the target node, as well as the observer options
  observer.observe(document.querySelector('body'), { childList : true, subtree : true});

  return {
    ready(callback) {
      ready = callback;
    },
    removed(callback) {
      removed = callback;
    },
    render(html) {
      html = prepare(html);
      const name    = html.getAttribute('id');
      const current = document.querySelector('#' + name);
      if (current) {
        current.innerHTML = html.innerHTML;
      }
    }
  }

  function prepare(html) {
    // Convert the string to HTML, fucked up shit dom strings :S
    let wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1');
    return wrapper.firstChild;
  }
  
}());

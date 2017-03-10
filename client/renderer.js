module.exports = function(state) {

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.removedNodes) {
        mutation.removedNodes.forEach(node => {
          if (node.getAttribute('id')) {
            state.dispatch('componentRemoved', node.getAttribute('id'));
          }
        })
      }
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach(node => {
          if (node.getAttribute('id')) {
            // TODO: Dirty fix to wait for the children being loaded
            setTimeout(function() {
              state.dispatch('componentReady', node.getAttribute('id'));
            }, 500);
          }
        })
      }
    });
  });

  // pass in the target node, as well as the observer options
  observer.observe(document.querySelector('body'), { childList : true, subtree : true});

  // Run the ready call for on page elements
  const components = [].slice.call(document.querySelectorAll(`[id]`));
  components.forEach(component => {
    const name = component.getAttribute('id');
    if (name) {
      state.dispatch('componentReady', name);
    }
  });

  function prepare(html) {
    // Convert the string to HTML, fucked up shit dom strings :S
    let wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1');
    return wrapper.firstChild;
  }

  // Watch for render changes
  return {
    render(html) {
      html = prepare(html);
      const name    = html.getAttribute('id');
      const current = document.querySelector('#' + name);
      if (current) {
        state.dispatch('componentAdded', name);
        current.innerHTML = html.innerHTML;
      }
    }
  }

};

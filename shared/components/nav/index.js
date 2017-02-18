const html  = require('./html');
const watch = require('redux-watch');

module.exports = function() {

  let unsubscribe;

  return {
    create(renderer, store) {
      renderer.render(html());
    },
    init(renderer, store) {
      subscribe(renderer, store);
      setActive(store.getState().menuActive.active);
      switcher();
    },
    added(renderer, store) {
      subscribe(renderer, store);
    },
    removed() {
      unsubscribe();
    }
  }

  function switcher() {
    const switcher = document.querySelector('component-nav .close');
    switcher.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('component-nav').classList.toggle('closed');
      document.querySelector('main').classList.toggle('full');
    });
  }

  function setActive(active) {
    const links = [].slice.call(document.querySelectorAll('component-nav a'));
    links.forEach(link => {
      if (link.getAttribute('href') === active) {
        link.classList.add('active');
      } else if (link.classList.contains('active')) {
        link.classList.remove('active');
      }
    });
  }

  function subscribe(renderer, store) {
    let watcher = watch(store.getState, 'menuActive.active');
    unsubscribe = store.subscribe(watcher(active => setActive(active)));
  }
}

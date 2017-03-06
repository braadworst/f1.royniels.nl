const loaded = require('./loaded')();

module.exports = function(create, added, removed) {

  create((render, state, component) => {
    render(loaded);
  });

  added((render, state, component) => {
    switcher();
    state.watch('menuActive', active => {
      setActive(active);
    });
    setActive(state.get('menuActive.active'));
  });

  removed((render, state, component) => {
    state.unwatch('menuActive');
  });

  function switcher() {
    const switcher = document.querySelector('#nav .close');
    switcher.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('#nav').classList.toggle('closed');
      document.querySelector('main').classList.toggle('full');
    });
  }

  function setActive(active) {
    const links = [].slice.call(document.querySelectorAll('#nav a'));
    links.forEach(link => {
      if (link.getAttribute('href') === active) {
        link.classList.add('active');
      } else if (link.classList.contains('active')) {
        link.classList.remove('active');
      }
    });
  }
}

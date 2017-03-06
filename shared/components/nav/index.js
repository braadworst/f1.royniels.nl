const loaded = require('./loaded')();

module.exports = function(init) {

  return {
    create : init((render, state) => {
      console.log('NAV CREATE');
      render(loaded);
    }),
    added : init((render, state) => {
      console.log('NAV ADDED');
      switcher();
      state.watch('menuActive', active => {
        setActive(active);
      });
      setActive(state.get('menuActive.active'));
    }),
    removed : init((render, state) => {
      state.unwatch('menuActive');
    })
  }

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

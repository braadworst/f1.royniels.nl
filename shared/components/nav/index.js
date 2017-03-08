const loaded = require('./loaded')();

module.exports = component => {
  component
    .loaded(() => component.render(loaded))
    .ready(() => {
      switcher();
      component.watch('menu.active', active => setActive(active));
      setActive(component.state('menu.active'));
    })
    .removed(() => {
      component.unwatch('menu.active');
    });

  function switcher() {
    const switcher = document.querySelector('#nav .close');
    switcher.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('#nav').classList.toggle('closed');
      document.querySelector('#switcher').classList.toggle('full');
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

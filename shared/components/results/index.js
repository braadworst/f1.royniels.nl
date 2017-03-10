const loaded = require('./loaded');

module.exports = component => {
  component
    .data('drivers', 'circuits')
    .loaded((menu, myTeams, user) => {
      component.render(loaded(user, myTeams));
    })
    .ready((menu, myTeams, user) => {
      switcher();
      component.watch('menu.active', active => setActive(active));
      setActive(menu.active);
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

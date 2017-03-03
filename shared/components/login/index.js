const html    = require('./html');
const request = require('../../data/request');

module.exports = function() {

  return {
    create(renderer) {
      renderer.render(html(), true);
    },
    init(renderer, store) {
      addHandlers();
    },
    added(renderer, store) {
      addHandlers();
    }
  }

  function addHandlers() {
    const links = [].slice.call(document.querySelectorAll('component-login li'));

    links.forEach(link => {
      link.addEventListener('click', async function(event) {
        event.preventDefault();
        try {
          console.log('auth');
          await request.login(link.getAttribute('data-method'));
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
}

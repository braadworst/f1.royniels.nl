module.exports = function() {
  const switcher = document.querySelector('#navigation .close');
  switcher.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#menu').classList.toggle('closed');
    document.querySelector('#main').classList.toggle('full');
  });

  // function setActive(active) {
  //   const links = [].slice.call(document.querySelectorAll('#nav a'));
  //   links.forEach(link => {
  //     if (link.getAttribute('href') === active) {
  //       link.classList.add('active');
  //     } else if (link.classList.contains('active')) {
  //       link.classList.remove('active');
  //     }
  //   });
  // }
}

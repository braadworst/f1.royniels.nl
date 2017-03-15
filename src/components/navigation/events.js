module.exports = function(api, router) {
  const switcher = document.querySelector('#navigation .close');
  switcher.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#navigation').classList.toggle('closed');
    document.querySelector('#main').classList.toggle('full');
  });
  
  const links = [].slice.call(document.querySelectorAll('#navigation a'));
  links.forEach(link => {
    if (link.getAttribute('href') === router.current()) {
      link.classList.add('active');
    } else if (link.classList.contains('active')) {
      link.classList.remove('active');
    }
  });
}

module.exports = function(api) {
  const switcher = document.querySelector('#navigation .close');
  switcher.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#navigation').classList.toggle('closed');
    document.querySelector('#main').classList.toggle('full');
  });

  const links = [].slice.call(document.querySelectorAll('#navigation a'));
  links.forEach(link => {
    if (link.getAttribute('href') === window.location.pathname) {
      link.classList.add('active');
    } else if (link.classList.contains('active')) {
      link.classList.remove('active');
    }
  });

  if (window.innerWidth < 600) {
    document.querySelector('#navigation').classList.toggle('closed');
    document.querySelector('#main').classList.toggle('full');    
  }
}

module.exports = function(id) {
  return `
  <section id="switcher">
    ${ switcher(id) }
  </section>
  `;
}

function switcher(id) {
  return id ? `<section id="${ id }"></section>` : '';
}

module.exports = function(id) {
  return `
  <section id="swicther">
    ${ switcher(id) }
  </section>
  `;
}

function switcher(id) {
  return id ? `<section id="${ id }"></section>` : '';
}

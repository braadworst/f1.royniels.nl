let url = require('../../helpers/url');

module.exports = function(step) {
  return `
  <component-nav>
    <ul>
      <li><a href="${ url.home() }">Home</a></li>
      <li><a href="${ url.detail() }">Detail</a></li>
    </ul>
  </component-nav>
  `;
}

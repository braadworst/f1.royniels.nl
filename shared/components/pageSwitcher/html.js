const decamelize = require('decamelize');

module.exports = function(page) {
  return `
  <component-page-switcher>
    <${ decamelize(page, '-') }></${ decamelize(page, '-') }>
  </component-page-switcher>
  `;
}

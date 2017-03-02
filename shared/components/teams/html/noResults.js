const range = require('lodash/range');

module.exports = function(options) {
  return `
  <component-teams class="animation-page-in loading">
    <h1>All teams</h1>
    <div class="note">
      No teams have been created yet.
    </div>
  </component-teams>
  `;
}

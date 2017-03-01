const range = require('lodash/range');

module.exports = function(options) {
  return `
  <component-races class="animation-page-in loading">
    <h1>Race results</h1>
    <div class="pure-g">
      ${ range(20).map(row).join('') }
    </div>
  </component-races>
  `;
}

function row() {
  return `
  <div class="pure-u-1-1 pure-u-md-1-2 pure-u-lg-1-3">
    <div class="item-race">
      <div class="item-media">
      </div>
      <div class="item-body">
        <h1>&nbsp;</h1>
        <p>&nbsp;</p>
      </div>
      <div class="item-footer">
        <form method="post" class="pure-form pure-form-stacked">
          <div class="form-field">
            <label>Driver of the day</label>
          </div>
          <div class="form-field">
            <label>Fastest lap</label>
          </div>
          <span class="button"></span>
        </form>
      </div>
    </div>
  </div>
  `;
}

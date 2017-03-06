const range = require('lodash/range');

module.exports = function() {
  return `
  <section id="teams" class="animation-page-in loading">
    <h1>All teams</h1>
    ${ range(20).map(row).join('') }
  </section>
  `;
}

function row() {
  return `
    <a href="">
      <section class="item-team">
        <div class="pure-g">
          <div class="pure-u-1-2 pure-u-md-1-3">
            <h1>&nbsp;</h1>
            <p>&nbsp;</p>
          </div>
          <div class="pure-u-1-2 pure-u-md-2-3">
            <div class="pure-g">
              <div class="pure-u-1-1 pure-u-md-1-2">
                <div class="item-body">
                  <div class="item-media">
                  </div>
                  <p>&nbsp;<br><span>&nbsp;</span></p>
                </div>
                <div class="item-body">
                  <div class="item-media">
                  </div>
                  <p>&nbsp;<br><span>&nbsp;</span></p>
                </div>
              </div>
              <div class="pure-u-1-1 pure-u-md-1-2">
                <div class="item-body">
                  <div class="item-media">
                  </div>
                  <p>&nbsp;<br><span>&nbsp;</span></p>
                </div>
                <div class="item-body">
                  <div class="item-media">
                  </div>
                  <p>&nbsp;<br><span>&nbsp;</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </a>
  `;
}

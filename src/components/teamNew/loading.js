const range = require('lodash/range');

module.exports = function() {
  return `
  <section id="teamNew">
    <form class="pure-form">
      <div class="pure-g">
      <div class="pure-u-1-1 pure-u-md-1-3">
        <div class="content">
          &nbsp;
        </div>
      </div>
        <div class="pure-u-1-1 pure-u-md-1-3">
          <div class="content">
            &nbsp;
          </div>
        </div>
        <div class="pure-u-1-1 pure-u-md-1-3">
          <div class="content">
            &nbsp;
          </div>
        </div>
      </div>
    </form>

    <h1 class="section-header">Select drivers</h1>
    <section class="pure-g">
      ${ range(20).map(rowDriver).join('') }
    </section>
    <h1 class="section-header">Select engines</h1>
    <section class="pure-g">
      ${ range(4).map(rowEngine).join('') }
    </section>
    <h1 class="section-header">Select chassis</h1>
    <section class="pure-g">
      ${ range(10).map(rowChassis).join('') }
    </section>

  </section>
  `;
}

function rowDriver() {
  return `
  <div class="pure-u-1-1 pure-u-md-1-3 pure-u-lg-1-4">
    <section class="item-create item-create-driver" data-price="">
      <div class="item-media">
      </div>
      <div class="item-body">
        <h1>&nbsp;</h1>
        <p class="team">&nbsp;</p>
        <p><span class="price">&nbsp;</span></p>
      </div>
    </section>
  </div>
  `;
}

function rowEngine() {
  return `
  <div class="pure-u-1-1 pure-u-md-1-3 pure-u-lg-1-4">
    <section class="item-create item-create-engine" data-price="">
      <div class="item-media">
      </div>
      <div class="item-body">
        <h1>&nbsp;</h1>
        <p><span class="price">&nbsp;</span></p>
      </div>
    </section>
  </div>
  `;
}

function rowChassis() {
  return `
  <div class="pure-u-1-1 pure-u-md-1-3 pure-u-lg-1-4">
    <section class="item-create item-create-chassis" data-price="">
      <div class="item-media">
      </div>
      <div class="item-body">
        <h1>&nbsp;</h1>
        <p><span class="price">&nbsp;</span></p>
      </div>
    </section>
  </div>
  `;
}

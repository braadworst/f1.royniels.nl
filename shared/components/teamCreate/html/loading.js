module.exports = function() {
  return `
  <component-team-create class="animation-page-in">
    <form class="pure-form">
      <div class="pure-g">
      <div class="pure-u-1-1 pure-u-md-1-3">
        <div class="content">
          <h2>€ <span class="budget"><span class="filler"></span></span></h2>
        </div>
      </div>
        <div class="pure-u-1-1 pure-u-md-1-3">
          <div class="content">
            <input type="text" name="name" placeholder="Enter your team name..." autocomplete="off" maxlength="40">
          </div>
        </div>
        <div class="pure-u-1-1 pure-u-md-1-3">
          <div class="content">
            <a href="" class="button">Create team</a>
          </div>
        </div>
      </div>
    </form>

    <h1 class="section-header">Select drivers</h1>
    <section class="pure-g">
      ${ [0,0,0,0,0,0,0,0].map(rowDriver).join('') }
    </section>
    <h1 class="section-header">Select engines</h1>
    <section class="pure-g">
      ${ [0,0,0].map(rowEngine).join('') }
    </section>
    <h1 class="section-header">Select chassis</h1>
    <section class="pure-g">
      ${ [0,0,0].map(rowChassis).join('') }
    </section>

  </component-team-create>
  `;
}

function rowDriver() {
  return `
  <div class="pure-u-1-1 pure-u-md-1-3 pure-u-lg-1-4">
    <section class="item-create item-create-driver" data-price="">
      <div class="item-media">
        <img class="pure-img" src="">
      </div>
      <div class="item-body">
        <h1><span class="filler"></span></h1>
        <p class="team"><span class="filler"></span></p>
        <p><span class="price">€ <span class="filler"></span></span></p>
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
        <img class="pure-img" src="">
      </div>
      <div class="item-body">
        <h1><span class="filler"></span></h1>
        <p><span class="price">€ <span class="filler"></span></span></p>
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
        <img class="pure-img" src="">
      </div>
      <div class="item-body">
        <h1><span class="filler"></span></h1>
        <p><span class="price">€ <span class="filler"></span></span></p>
      </div>
    </section>
  </div>
  `;
}

module.exports = function(options) {
  return `
  <component-team-create>
    <form class="pure-form">
      <div class="pure-g">
      <div class="pure-u-1-1 pure-u-md-1-3">
        <div class="content">
          <h2>€ ${ options.budget.toLocaleString() }</h2>
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
      ${ options.drivers.map(rowDriver).join('') }
    </section>
    <h1 class="section-header">Select engines</h1>
    <section class="pure-g">
      ${ options.engines.map(rowEngine).join('') }
    </section>
    <h1 class="section-header">Select chassis</h1>
    <section class="pure-g">
      ${ options.chassis.map(rowChassis).join('') }
    </section>

  </component-team-create>
  `;
}

function rowDriver(item) {
  return `
  <div class="pure-u-1-1 pure-u-md-1-3 pure-u-lg-1-4">
    <section class="item-create item-create-driver">
      <div class="item-media">
        <img class="pure-img" src="${ item.image }">
      </div>
      <div class="item-body">
        <h1>${ item.name }</h1>
        <p class="team">${ item.team }</p>
        <p><span class="price">€ ${ item.price.toLocaleString() }</span></p>
      </div>
    </section>
  </div>
  `;
}

function rowEngine(item) {
  return `
  <div class="pure-u-1-1 pure-u-md-1-3 pure-u-lg-1-4">
    <section class="item-create item-create-engine">
      <div class="item-media">
        <img class="pure-img" src="${ item.image }">
      </div>
      <div class="item-body">
        <h1>${ item.name }</h1>
        <p><span class="price">€ ${ item.price.toLocaleString() }</span></p>
      </div>
    </section>
  </div>
  `;
}

function rowChassis(item) {
  return `
  <div class="pure-u-1-1 pure-u-md-1-3 pure-u-lg-1-4">
    <section class="item-create item-create-chassis">
      <div class="item-media">
        <img class="pure-img" src="${ item.image }">
      </div>
      <div class="item-body">
        <h1>${ item.name }</h1>
        <p><span class="price">€ ${ item.price.toLocaleString() }</span></p>
      </div>
    </section>
  </div>
  `;
}

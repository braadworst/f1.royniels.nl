module.exports = function(user, drivers, engines, chassis, team = {}) {
  return `
  <section id="team" class="team">
    <div class="notification notification-errors hidden">
      Some errors
    </div>
    <div data-user-id="${ user.id }" data-team-id="${ team.id }">
    <form class="pure-form">
      <div class="pure-g">
      <div class="pure-u-1-1 pure-u-md-1-3">
        <div class="content">
          <h2>€ <span class="budget"></span></h2>
        </div>
      </div>
        <div class="pure-u-1-1 pure-u-md-1-3">
          <div class="content">
            <input type="text" name="name" placeholder="Enter your team name..." autocomplete="off" maxlength="40" value="${ team.name ? team.name : '' }">
          </div>
        </div>
        <div class="pure-u-1-1 pure-u-md-1-3">
          <div class="content">
            <a href="" class="button">${ team.id ? 'Save changes' : 'Create team' }</a>
          </div>
        </div>
      </div>
    </form>

    <h1 class="section-header">Select drivers</h1>
    <section class="pure-g">
      ${ drivers.map(driver => rowDriver(driver, team)).join('') }
    </section>
    <h1 class="section-header">Select engines</h1>
    <section class="pure-g">
      ${ engines.map(engine => rowEngine(engine, team)).join('') }
    </section>
    <h1 class="section-header">Select chassis</h1>
    <section class="pure-g">
      ${ chassis.map(chassi => rowChassis(chassi, team)).join('') }
    </section>

  </section>
  `;
}

function rowDriver(item, team) {
  let selected = '';
  if (team.firstDriverId === item.id || team.secondDriverId === item.id) {
    selected = 'item-create-selected';
  }
  return `
  <div class="pure-u-1-1 pure-u-md-1-3 pure-u-lg-1-4">
    <section class="item-create item-create-driver ${ selected }" data-price="${ item.price }" data-id="${ item.id }">
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

function rowEngine(item, team) {
  return `
  <div class="pure-u-1-1 pure-u-md-1-3 pure-u-lg-1-4">
    <section class="item-create item-create-engine ${ team.engineId === item.id ? 'item-create-selected' : ''}" data-price="${ item.price }" data-id="${ item.id }">
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

function rowChassis(item, team) {
  return `
  <div class="pure-u-1-1 pure-u-md-1-3 pure-u-lg-1-4">
    <section class="item-create item-create-chassis ${ team.chassisId === item.id ? 'item-create-selected' : ''}" data-price="${ item.price }" data-id="${ item.id }">
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

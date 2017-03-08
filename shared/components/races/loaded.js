module.exports = function(circuits, drivers) {
  return `
  <section id="races" class="animation-page-in">
    <h1>Race results</h1>
    <div class="pure-g">
      ${ circuits.map(circuit => row(circuit, drivers)).join('') }
    </div>
  </section>
  `;
}

function row(circuit, drivers) {
  return `
  <div class="pure-u-1-1 pure-u-md-1-2 pure-u-lg-1-3">
    <div class="item-race ${ circuit.upcoming ? 'item-race-upcoming' : ''}">
      <div class="item-media">
        <img class="pure-img" src="${ circuit.image }">
      </div>
      <div class="item-body">
        <h1>${ circuit.name } ${ circuit.upcoming ? '(upcoming)' : ''}</h1>
        <p>${ circuit.date }</p>
      </div>
      <div class="item-footer">
        <form method="post" class="pure-form pure-form-stacked">
          <div class="form-field">
            <label>Driver of the day</label>
            <select name="driver-of-the-day">
              <option>Select driver</option>
              ${ drivers.map(option).join('') }
            </select>
          </div>
          <div class="form-field">
            <label>Fastest lap</label>
            <select name="driver-fastest-lap">
            <option>Select driver</option>
            ${ drivers.map(option).join('') }
            </select>
          </div>
          ${ showButton(circuit.passed) }
        </form>
      </div>
    </div>
  </div>
  `;
}

function showButton(passed) {
  if (passed) {
    return `<span class="passed">Closed</span>`;
  }
  return `<button type="submit" class="button button-light">Save</button>`;
}

function option(driver) {
  return `
    <option value="${ driver.id }">${ driver.name }</option>
  `;
}

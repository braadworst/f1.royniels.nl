module.exports = (user, drivers, circuits, results) => {
  return `
    <section id="results">
      <h1>Results</h1>
      <div class="pure-g">
        ${ circuits.map(item) }
      </div>
    </section>
  `;

  function item(circuit) {
    const result = results.filter(result => result.circuitId === circuit.id).pop();
    return `
      <div class="pure-u-md-1-3 pure-u-1-1">
        <div class="item-results">
          <form class="pure-form pure-form-aligned">
            ${ showResultId(result) }
            <h3>${ circuit.name }</h3>
            ${ selects('one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'best', 'fastest') }
            <button class="button">Save</button>
            <div class="notification notification-success hidden">Changes saved!</div>
            <div class="notification notification-error hidden">Fill everything</div>
          </form>
        </div>
      </div>
    `;
  }

  function showResultId(result) {
    if (prediction) {
      return `<input type="hidden" name="predictionId" value="${ result.id }">`;
    }
    return '';
  }

  function options(drivers) {
    return drivers.map(driver => {
      return `<option value="${ driver.id }">${ driver.name }</option>`;
    }).join('');
  }

  function selects(...list) {
    return list.map(item => {
      return `
        <div class="pure-control-group">
          <div class="form-field">
            <label>${ item }</label>
            <select name="${ item }">
              <option>Select driver</option>
              ${ options(drivers) }
            </select>
          </div>
        </div>
      `
    }).join('');
  }
}

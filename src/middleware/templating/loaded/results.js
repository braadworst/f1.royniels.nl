module.exports = (user, drivers, circuits, results) => {
  return `
    <section id="results">
      <h1>Results</h1>
      <div class="pure-g">
        ${ circuits.map(item).join('') }
      </div>
    </section>
  `;

  function item(circuit) {
    const result = results.filter(result => result.circuitId === circuit.id).pop();
    return `
      <div class="pure-u-md-1-3 pure-u-1-1">
        <div class="item-results">
          <form class="pure-form">
            ${ showResultId(result) }
            <input type="hidden" name="circuitId" value="${ circuit.id }">
            <h3>${ circuit.name }</h3>
            ${ selects('one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'best', 'fastest', result) }
            <button class="button">Save</button>
            <div class="notification notification-success hidden">Changes saved!</div>
            <div class="notification notification-error hidden">Fill everything</div>
          </form>
        </div>
      </div>
    `;
  }

  function showResultId(result) {
    if (result) {
      return `<input type="hidden" name="resultId" value="${ result.id }">`;
    }
    return '';
  }

  function options(drivers, result, key) {
    return drivers.map(driver => {
      let selected = '';
      if (result && result[key] === driver.id) {
        selected = 'selected';
      }
      return `<option ${ selected } value="${ driver.id }">${ driver.name }</option>`;
    }).join('');
  }

  function selects(...list) {
    const result = list.pop();
    return list.map(item => {
      return `
        <div class="form-field">
          <select name="${ item }">
            <option>${ item }</option>
            ${ options(drivers, result, item) }
          </select>
        </div>
      `
    }).join('');
  }
}

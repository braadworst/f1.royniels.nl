module.exports = function(user, circuits, drivers, predictions) {
  return `
  <section id="predictions" class="predictions">
    <h1>Race results</h1>
    <div class="pure-g">
      ${ circuits.map(circuit => row(circuit, drivers, predictions)).join('') }
    </div>
  </section>
  `;

  function row(circuit, drivers, predictions) {
    const prediction = predictions.filter(prediction => prediction.circuitId === circuit.id).pop();
    console.log(prediction);
    return `
    <div class="pure-u-1-1 pure-u-md-1-2 pure-u-lg-1-3">
      <div class="item-race ${ circuit.upcoming ? 'item-race-upcoming' : ''}">
        <div class="item-media">
          <img class="pure-img" src="${ circuit.image }">
        </div>
        <div class="item-body">
          <h1>${ circuit.name }</h1>
          <p>${ circuit.date }</p>
        </div>
        <div class="item-footer">
          <form method="post" class="pure-form pure-form-stacked">
            ${ showPredictionId(prediction) }
            <input type="hidden" name="userId" value="${ user.id }">
            <input type="hidden" name="circuitId" value="${ circuit.id }">
            <div class="form-field">
              <label>Driver of the day</label>
              <select name="best" ${ circuit.passed ? 'disabled' : ''}>
                <option>Select driver</option>
                ${ drivers.map(driver => option(driver, prediction, 'bestDriverId')).join('') }
              </select>
            </div>
            <div class="form-field">
              <label>Fastest lap</label>
              <select name="fastest" ${ circuit.passed ? 'disabled' : ''}>
              <option>Select driver</option>
              ${ drivers.map(driver => option(driver, prediction, 'fastestDriverId')).join('') }
              </select>
            </div>
            ${ showButton(circuit.passed, prediction) }
            <div class="notification notification-success hidden">Changes saved!</div>
            <div class="notification notification-error hidden">Please select fastest AND best drivers</div>
          </form>
        </div>
      </div>
    </div>
    `;
  }

  function showPredictionId(prediction) {
    if (prediction) {
      return `<input type="hidden" name="predictionId" value="${ prediction.id }">`;
    }
    return '';
  }

  function showButton(passed, prediction) {
    if (passed) {
      return `<span class="passed">Closed</span>`;
    }
    return `<button type="submit" class="button button-light">${ prediction ? 'Update' : 'Save' }</button>`;
  }

  function option(driver, prediction, type) {
    let selected = '';
    if (prediction && prediction[type] === driver.id) {
      selected = 'selected';
    }
    return `
      <option ${ selected } value="${ driver.id }">${ driver.name }</option>
    `;
  }
}

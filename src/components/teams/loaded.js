module.exports = function(teams) {
  return `
  <section id="teams">
    <h1>All teams</h1>
    <div class="pure-g">
      ${ teams.map(row).join('') }
    </div>
  </section>
  `;
}

function row(team) {
  return `
    <div class="pure-u-1-1 pure-u-md-1-3">
      <section class="item-team">
        <div class="item-header">
          <h1>${ team['teams-name'] }</h1>
          <p>${ team['users-name'] }</p>
        </div>
        <div class="item-body">
          <div class="item-media">
            <img class="pure-img" src="${ team['firstDriver-image'] }">
          </div>
          <p>${ team['firstDriver-name'] }<br><span>1ST Driver</span></p>
        </div>
        <div class="item-body">
          <div class="item-media">
            <img class="pure-img" src="${ team['secondDriver-image'] }">
          </div>
          <p>${ team['secondDriver-name'] }<br><span>2ND Driver</span></p>
        </div>
        <div class="item-body">
          <div class="item-media">
            <img class="pure-img" src="${ team['engines-image'] }">
          </div>
          <p>${ team['engines-name'] }<br><span>Engine</span></p>
        </div>
        <div class="item-body">
          <div class="item-media">
            <img class="pure-img" src="${ team['chassis-image'] }">
          </div>
          <p>${ team['chassis-name'] }<br><span>Chassis</span></p>
        </div>
      </section>
    </div>
  `;
}

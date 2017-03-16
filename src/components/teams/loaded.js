module.exports = function(teams) {
  return `
  <section id="teams">
    <h1>All teams</h1>
    ${ teams.map(row).join('') }
  </section>
  `;
}

function row(team) {
  return `
    <a href="">
      <section class="item-team">
        <div class="pure-g">
          <div class="pure-u-1-2 pure-u-md-1-3">
            <h1>${ team['teams-name'] }</h1>
            <p>${ team['users-name'] }</p>
          </div>
          <div class="pure-u-1-2 pure-u-md-2-3">
            <div class="pure-g">
              <div class="pure-u-1-1 pure-u-md-1-2">
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
              </div>
              <div class="pure-u-1-1 pure-u-md-1-2">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </a>
  `;
}

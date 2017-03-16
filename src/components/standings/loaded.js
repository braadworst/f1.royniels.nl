module.exports = function(standings) {
  return `
  <section id="standings">
    <h1>Standings</h1>
    <ul class="group-standings">
      ${ standings.map(row).join('') }
    </ul>
  </section>
  `;

  function row(standing) {
    return `
    <li>
      <div class="item-standings">
        <div class="item-header">
          ${ standing['standings-rank'] }
        </div>
        <div class="item-body">
          <h1>${ standing['teams-name'] }</h1>
          <p>${ standing['users-name'] }</p>
        </div>
        <div class="item-footer">
          ${ standing['standings-points'] }
        </div>
      </div>
    </li>
    `;
  }
}

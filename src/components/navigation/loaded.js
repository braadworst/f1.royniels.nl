module.exports = function(user, teams, paths) {
  return `
  <section id="navigation">
    <nav>
      <a href="" class="close"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></a>
      <ul>
        <li>
          <div class="brand">
            <span class="logo first"></span><span class="logo second"></span><span class="logo third"></span><span class="logo fourth"></span>
            <span class="name">F1 Manager</span>
          </div>
        </li>
        <li><a href="${ paths.teamCreate }">Create team</a></li>
        <li><a href="${ paths.teams }">All teams</a></li>
        <li><a href="${ paths.races }">Races</a></li>
        <li><a href="${ paths.standings }">Standings</a></li>
        <li><a href="${ paths.rules }">Rules</a></li>
        <li><a href="${ paths.logout }" data-router-server>Logout</a></li>
      </ul>
    </nav>
  </section>
  `;

  // function showAdmin(bool) {
  //   if (bool) {
  //     return `<li><a href="${ paths.results }">results</a></li>`;
  //   }
  // }
}

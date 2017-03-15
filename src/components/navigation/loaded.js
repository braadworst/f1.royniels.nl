const paths = require('../../paths');

module.exports = function(user, teams) {
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
        <li><a href="${ paths.get('teamCreate') }">Create team</a></li>
        <li><a href="${ paths.get('teams') }">All teams</a></li>
        <li><a href="${ paths.get('races') }">Races</a></li>
        <li><a href="${ paths.get('standings') }">Standings</a></li>
        <li><a href="${ paths.get('rules') }">Rules</a></li>
        <li><a href="${ paths.get('logout') }" data-router-server>Logout</a></li>
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

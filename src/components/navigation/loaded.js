const paths    = require('../../paths');
const settings = require('../../settings/client');

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
        ${ showCreate() }
        ${ myTeams() }
        <li><a href="${ paths.get('teams') }">All teams</a></li>
        <li><a href="${ paths.get('predictions') }">Race predictions</a></li>
        <li><a href="${ paths.get('standings') }">Standings</a></li>
        <li><a href="${ paths.get('rules') }">Rules</a></li>
        ${ showAdmin() }
        <li><a href="${ paths.get('logout') }" data-router-server>Logout</a></li>
      </ul>
    </nav>
  </section>
  `;

  function showCreate() {
    if (settings.maxTeams > teams.length) {
      return `<li><a href="${ paths.get('teamNew') }">Create team</a></li>`;
    }
    return '';
  }

  function myTeams() {
    return teams.map(team => {
      return `<li><a href="${ paths.get('teamEdit', team.id) }">${ team.name }</a></li>`;
    }).join('');
  }

  function showAdmin() {
    if (user.isAdmin) {
      return `<li><a href="${ paths.get('results') }">Race results</a></li>`;
    }
    return '';
  }
}

let url = require('../../routing/url');

module.exports = function(step) {
  return `
  <section id="nav">
    <nav>
      <a href="" class="close"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></a>
      <ul>
        <li>
          <div class="brand">
            <span class="logo first"></span><span class="logo second"></span><span class="logo third"></span><span class="logo fourth"></span>
            <span class="name">F1 Manager</span>
          </div>
        </li>
        <li><a href="${ url.teamCreate() }">Create team</a></li>
        <li><a href="${ url.teams() }">All teams</a></li>
        <li><a href="${ url.races() }">Races</a></li>
        <li><a href="${ url.standings() }">Standings</a></li>
        <li><a href="${ url.rules() }">Rules</a></li>
        <li><a href="${ url.logout() }" data-router-server>Logout</a></li>
      </ul>
    </nav>
  </section>
  `;
}

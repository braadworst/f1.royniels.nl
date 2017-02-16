let url = require('../../helpers/url');

module.exports = function(step) {
  return `
  <component-nav>
    <ul>
      <li><a href="${ url.home() }">Home</a></li>
      <li><a href="${ url.login() }">login</a></li>
      <li><a href="${ url.logout() }">logout</a></li>
      <li><a href="${ url.register() }">register</a></li>
      <li><a href="${ url.teams() }">teams</a></li>
      <li><a href="${ url.teamDetail('bla') }">team detail</a></li>
      <li><a href="${ url.teamCreate() }">Team create</a></li>
      <li><a href="${ url.races() }">Races</a></li>
      <li><a href="${ url.standings() }">Standings</a></li>
      <li><a href="${ url.rules() }">Rules</a></li>
    </ul>
  </component-nav>
  `;
}

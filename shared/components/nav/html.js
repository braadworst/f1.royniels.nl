let url = require('../../helpers/url');

module.exports = function(step) {
  return `
  <component-menu>
    <a class="close open" href=""><i class="fa fa-angle-double-left" aria-hidden="true"></i></a>
    <a class="user" href=""><img src="/img/user.jpg"> Nick de Groot<br><span>beheerder</span></a>
    <ul class="user-options">
      <li><a href=""><i class="fa fa-envelope" aria-hidden="true"></i><span>12</span></a></li>
      <li><a href=""><i class="fa fa-cog" aria-hidden="true"></i></a></li>
      <li><a href=""><i class="fa fa-user" aria-hidden="true"></i></a></li>
      <li><a href=""><i class="fa fa-sign-out" aria-hidden="true"></i></a></li>
    </ul>
    <ul class="menu-items">
      <li><h4>Voertuigen</h4></li>
      <li><a class="step-link" href="${ url.vehiclesAdd(step) }">Toevoegen <i class="fa fa-arrow-right" aria-hidden="true"></i></a></li>
      <li><a href="${ url.vehiclesOverview() }">Overzicht <i class="fa fa-arrow-right" aria-hidden="true"></i></a></li>
      <li><a href="${ url.vehiclesSold() }">Verkocht <i class="fa fa-arrow-right" aria-hidden="true"></i></a></li>
      <li><a href="${ url.vehiclesSpecs() }">Specificaties <i class="fa fa-arrow-right" aria-hidden="true"></i></a></li>
    </ul>
  </component-menu>
  `;
}

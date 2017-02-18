module.exports = function(options) {
  return `
  <component-teams>
    <h1>All teams</h1>
    ${ [0,0,0,0,0,0,0].map(row).join('') }
  </component-teams>
  `;
}

function row(team) {
  return `
    <a href="">
      <section class="item-team">
        <div class="pure-g">
          <div class="pure-u-1-2 pure-u-md-1-3">
            <h1>GVA</h1>
            <p>Matthijs Holtman</p>
          </div>
          <div class="pure-u-1-2 pure-u-md-2-3">
            <div class="pure-g">
              <div class="pure-u-1-1 pure-u-md-1-2">
                <div class="item-body">
                  <div class="item-media">
                    <img class="pure-img" src="https://www.formula1.com/content/fom-website/en/championship/drivers/daniel-ricciardo/_jcr_content/image.img.1920.medium.jpg/1481043343604.jpg">
                  </div>
                  <p>Daniel Ricciardo<br><span>1ST Driver</span></p>
                </div>
                <div class="item-body">
                  <div class="item-media">
                    <img class="pure-img" src="https://www.formula1.com/content/fom-website/en/championship/drivers/sebastian-vettel/_jcr_content/image.img.1920.medium.jpg/1458060706776.jpg">
                  </div>
                  <p>Sebastian Vettel<br><span>2ND Driver</span></p>
                </div>
              </div>
              <div class="pure-u-1-1 pure-u-md-1-2">
                <div class="item-body">
                  <div class="item-media">
                    <img class="pure-img" src="http://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png">
                  </div>
                  <p>Mercedes<br><span>Engine</span></p>
                </div>
                <div class="item-body">
                  <div class="item-media">
                    <img class="pure-img" class="logo" src="https://www.formula1.com/content/fom-website/en/championship/teams/Force-India/_jcr_content/logo.img.png/1424036629759.png">
                  </div>
                  <p>Force India<br><span>Chassis</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </a>
  `;
}

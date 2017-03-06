const cheerio = require('cheerio');

module.exports = function(template) {

  let output = cheerio.load(template);

  return {
    render(input) {
      let component = cheerio.load('<div>' + input + '</div>');
      output(component('div')[0].firstChild.next.name).replaceWith(input);
    },
    state(state) {
      output('.state').replaceWith(`<script>window.__PRELOADED_STATE__ = ${JSON.stringify(state)}</script>`);
    },
    html() {
      return output.html().trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1');
    }
  }
}

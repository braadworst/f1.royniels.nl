const cheerio = require('cheerio');

module.exports = function(template, store) {

  let callback;
  let output = cheerio.load(template);

  return {
    render(input, final = false) {
      let component = cheerio.load('<div>' + input + '</div>');
      output(component('div')[0].firstChild.next.name).replaceWith(input);
      if (final && callback) {
        output('.state').replaceWith(`<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}</script>`);
        callback(output.html().trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1'));
      }
    },
    loaded(cb) {
      callback = cb;
    }
  }
}

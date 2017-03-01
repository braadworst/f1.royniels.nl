const cheerio = require('cheerio');

module.exports = function(template, store) {

  let callback, output = cheerio.load(template);

  return {
    render(input, loadedContent = false) {
      let component = cheerio.load('<div>' + input + '</div>');
      output(component('div')[0].firstChild.next.name).replaceWith(input);
      if (loadedContent) {
        output('.state').replaceWith(`<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}</script>`);
        callback(output.html().trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1'));
      }
    },
    finished(cb) {
      callback = cb;
    }
  }
}

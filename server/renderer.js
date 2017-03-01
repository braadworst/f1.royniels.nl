const cheerio = require('cheerio');

module.exports = function(template, store) {

  let callback;
  let output = cheerio.load(template);

  function handle(input) {
    let component = cheerio.load('<div>' + input + '</div>');
    output(component('div')[0].firstChild.next.name).replaceWith(input);
  }

  function state() {
    output('.state').replaceWith(`<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}</script>`);
  }

  function minimize() {
    return output.html().trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1');
  }

  return {
    loading(input) {
      handle(input);
    },
    error(input) {
      handle(input);
    },
    render(input) {
      handle(input);
      state();
      // callback(minimize());
    },
    finished(cb) {
      callback = cb;
    }
  }
}

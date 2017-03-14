const cheerio = require('cheerio');

module.exports = (function() {

  let output;

  return {
    template(template) {
      output = cheerio.load(template);
    },
    render(html, placeholder) {
      if (!output(placeholder)) {
        throw new Error(`Renderer could not render, placeholder ${ placeholder } not found`);
      }
      output(placeholder).empty();
      output(placeholder).append(html);
    },
    state(state) {
      output('.state').replaceWith(`<script>window.__PRELOADED_STATE__ = ${JSON.stringify(state)}</script>`);
    },
    html() {
      return output.html().trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1');
    }
  }
}());

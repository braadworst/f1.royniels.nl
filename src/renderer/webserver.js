const cheerio = require('cheerio');

module.exports = () => {

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
    cache(cache) {
      output('#cache').replaceWith(`<script>window.__apiCache__ = ${JSON.stringify(cache)}</script>`);
    },
    html() {
      return output.html().trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1');
    }
  }
}

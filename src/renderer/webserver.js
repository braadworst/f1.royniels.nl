const cheerio = require('cheerio');

module.exports = function(template) {

  let output = cheerio.load(template);

  return {
    render(input) {
      // We wrap the element in a div, so the end user can use
      // any tag for a component.
      let component = cheerio.load('<div>' + input + '</div>');

      // Get the first element (the actual component) and take the id name
      const name = component('div').children().first().attr('id');

      // Add the new HTML to the placeholder tag that is in the template
      if (name) {
        output(`#${ name }`).replaceWith(input);
      } else {
        console.warn(`Could not render component, no id found on element`);
      }
    },
    state(state) {
      output('.state').replaceWith(`<script>window.__PRELOADED_STATE__ = ${JSON.stringify(state)}</script>`);
    },
    html() {
      return output.html().trim().replace( /(^|>)\s+|\s+(?=<|$)/g, '$1');
    }
  }
}

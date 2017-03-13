const loaded = require('./loaded')();

module.exports = component => {
  component
    .loaded(() => component.render(loaded));
}

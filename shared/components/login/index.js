const loaded = require('./loaded')();

module.exports = create => {
  create(render => {
    render(loaded);
  });
}

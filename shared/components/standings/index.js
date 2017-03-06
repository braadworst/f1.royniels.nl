const loaded = require('./loaded')();

module.exports = init => {
  return {
    create : init(render => {
      render(loaded);
    })
  }
}

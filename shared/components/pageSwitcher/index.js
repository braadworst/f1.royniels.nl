const html      = require('./html');
const action    = require('../../actions/component');

module.exports = function() {
  return {
    create(renderer, store) {

      // Get the active page
      const page = store.getState().component.page;

      renderer.render(html(page));
      store.dispatch(action.create(page));
    }
  }
}

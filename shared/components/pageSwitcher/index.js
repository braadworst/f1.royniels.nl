const html      = require('./html');
const action    = require('../../actions/component');

module.exports = function() {

  let page;

  return {
    loading(renderer, store) {
      page = store.getState().component.page;
      store.dispatch(action.create('componentPageSwitcher', page));
    },
    create(renderer, store) {
      renderer.render(html(page));
      store.dispatch(action.loading(page));
    }
  }
}

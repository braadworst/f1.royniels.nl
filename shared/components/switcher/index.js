const loaded = require('./loaded');

module.exports = component => {
  component
    .data('switcher.page')
    .loaded(page => {
      component.render(loaded(page));
      component.watch('switcher.page', async function(page) {
        component.render(loaded(page));
        await component.create(page);
      });
    });
}

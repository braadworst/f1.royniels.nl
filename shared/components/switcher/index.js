const loaded = require('./loaded');
const failed = require('./failed')();

module.exports = component => {
  component
    .loaded(async function() {
      const page = component.options().pop();
      if (page) {
        try {
          component.render(loaded(page));
          await component.create(page);
        } catch (error) {
          component.render(failed);
        }
      }
    });
}

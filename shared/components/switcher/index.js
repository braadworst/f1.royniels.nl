const loaded = require('./loaded');
const loaded = require('./failed')();

module.exports = component => {
  component
    .loaded(async function() {
      const page = component.parameters();
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

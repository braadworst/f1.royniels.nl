const loaded = require('./loaded');
const failed = require('./failed')();

module.exports = component => {
  component
    .loaded(async function() {
      console.log('switcher:',component.settings());
      if (component.settings()) {
        const page = component.settings().pop();
        try {
          component.render(loaded(page));
          await component.create(page);
        } catch (error) {
          component.render(failed);
        }
      }
    });
}

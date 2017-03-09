const loading = require('./loading')();
const loaded  = require('./loaded');
const empty   = require('./empty')();
const failed  = require('./failed')();

module.exports = component => {
  component
    .data('teams', 'drivers', 'engines', 'chassis')
    .loading(() => component.render(loading))
    .failed(() => component.render(failed))
    .empty(() => component.render(empty))
    .loaded(data => component.render(loaded(data)))
}

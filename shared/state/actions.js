module.exports = {
  dataLoading(name) {
    return { type : 'dataLoading', name };
  },
  dataLoaded(name, records) {
    return { type : 'dataLoaded', name, records };
  },
  dataFailed(name, error) {
    return { type : 'dataFailed', name, error };
  },
  menuActive(path) {
    return { type : 'menuActive', path };
  },
  switcher(page) {
    return { type : 'switcher', page };
  }
}

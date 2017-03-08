module.exports = {
  dataLoading(name) {
    return { type : 'dataLoading', name, status : 'loading' };
  },
  dataLoaded(name, records) {
    return { type : 'dataLoaded', name, records, status : 'loaded' };
  },
  dataFailed(name, error) {
    return { type : 'dataFailed', name, error, status : 'failed' };
  },
  menu(path) {
    return { type : 'active', active : path };
  }
}

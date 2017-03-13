module.exports = {
  dataSaving(name) {
    return { type : 'dataSaving', name, status : 'progress' };
  },
  dataSaved(name, record) {
    return { type : 'dataSaved', name, record, status : 'completed' };
  },
  dataNotSaved(name, error) {
    return { type : 'dataNotSaved', name, error, status : 'failed' };
  },
  dataLoading(name) {
    return { type : 'dataLoading', name, status : 'progress' };
  },
  dataLoaded(name, records) {
    return { type : 'dataLoaded', name, records, status : 'completed' };
  },
  dataNotLoaded(name, error) {
    return { type : 'dataNotLoaded', name, error, status : 'failed' };
  },
  menu(path) {
    return { type : 'active', active : path };
  },
  componentCreate(name, settings) {
    return { type : 'create', name };
  },
  componentLoading(name) {
    return { type : 'loading', name };
  },
  componentLoaded(name) {
    return { type : 'loaded', name };
  },
  componentReady(name) {
    return { type : 'ready', name };
  },
  componentFailed(name) {
    return { type : 'failed', name };
  },
  componentSettings(name, settings) {
    return { type : 'settings', name, settings };
  },
  componentRemoved(name) {
    return { type : 'removed', name };
  }
}

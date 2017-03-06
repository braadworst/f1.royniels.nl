module.exports = {
  componentCreate(name, page = false) {
    return { type : 'create', name, page } ;
  },
  componentRemoved(name, page = false) {
    return { type : 'removed', name, page };
  },
  componentAdded(name, page = false) {
    return { type : 'added', name, page };
  },
  createTeamSelect(teamId) {
    return { type : 'createTeamSelect', teamId };
  },
  createTeamDriver(driverId) {
    return { type : 'createTeamDriver', driverId };
  },
  createTeamEngine(engineId) {
    return { type : 'createTeamEngine', engineId };
  },
  createTeamChassis(chassisId) {
    return { type : 'createTeamChassis', chassisId };
  },
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
  }
}

const constants = require('../constants');

module.exports = (function() {
  return {
    select(teamId) {
      return {
        type : constants.createTeam.TEAM_SELECT_TEAM,
        teamId
      }
    },
    driver(driverId) {
      return {
        type : constants.createTeam.TEAM_SELECT_DRIVER,
        driverId
      }
    },
    engine(engineId) {
      return {
        type : constants.createTeam.TEAM_SELECT_ENGINE,
        engineId
      }
    },
    chassis(chassisId) {
      return {
        type : constants.createTeam.TEAM_SELECT_CHASSIS,
        chassisId
      }
    }
  }
}());

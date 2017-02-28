const COMPONENT_INIT      = 'init';
const COMPONENT_REMOVED   = 'remove';
const COMPONENT_ADDED     = 'added';
const COMPONENT_CREATE    = 'create';
const MENU_ACTIVE         = 'menuActive';
const URL_HOME            = '/';
const URL_LOGIN           = '/login';
const URL_LOGOUT          = '/logout';
const URL_REGISTER        = '/register';
const URL_TEAMS           = '/teams';
const URL_TEAM_DETAIL     = '/team/:teamId';
const URL_TEAM_CREATE     = '/create-team';
const URL_RACES           = '/races';
const URL_STANDINGS       = '/standings';
const URL_RULES           = '/rules';
const TEAM_SELECT_TEAM    = 'teamSelectTeam';
const TEAM_SELECT_DRIVER  = 'teamSelectDriver';
const TEAM_SELECT_ENGINE  = 'teamSelectEngine';
const TEAM_SELECT_CHASSIS = 'teamSelectChassis';
const FETCH_FAILED        = 'fetchFailed';
const FETCH_LOADED        = 'fetchLoaded';
const FETCH_LOADING       = 'fetchLoading';
const FETCH_ALL_LOADED    = 'fetchAllLoaded';

module.exports = {
  component : {
    COMPONENT_INIT,
    COMPONENT_ADDED,
    COMPONENT_REMOVED,
    COMPONENT_CREATE,
  },
  menu : {
    MENU_ACTIVE
  },
  url : {
    URL_HOME,
    URL_LOGIN,
    URL_LOGOUT,
    URL_REGISTER,
    URL_TEAMS,
    URL_TEAM_DETAIL,
    URL_TEAM_CREATE,
    URL_RACES,
    URL_STANDINGS,
    URL_RULES
  },
  createTeam : {
    TEAM_SELECT_TEAM,
    TEAM_SELECT_DRIVER,
    TEAM_SELECT_ENGINE,
    TEAM_SELECT_CHASSIS,
  },
  fetch : {
    FETCH_FAILED,
    FETCH_LOADED,
    FETCH_LOADING,
    FETCH_ALL_LOADED
  }
}

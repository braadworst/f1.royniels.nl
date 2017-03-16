module.exports = (user, drivers, engines, chassis, team) => {

  let output;
  if (Array.isArray(team) && team.length > 0) {
    team = team.pop();
    output = {
      id             : team['teams-id'],
      secondDriverId : team['teams-secondDriverId'],
      firstDriverId  : team['teams-firstDriverId'],
      engineId       : team['teams-engineId'],
      chassisId      : team['teams-chassisId'],
      name           : team['teams-name']
    };
  }

  return [user, drivers, engines, chassis, output];
}

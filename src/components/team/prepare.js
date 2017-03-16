module.exports = (user, drivers, engines, chassis, team) => {

  team = team.pop();
  const output = {
    id             : team['teams-id'],
    secondDriverId : team['teams-secondDriverId'],
    firstDriverId  : team['teams-firstDriverId'],
    engineId       : team['teams-engineId'],
    chassisId      : team['teams-chassisId'],
    name           : team['teams-name']
  };

  return [user, drivers, engines, chassis, output];
}

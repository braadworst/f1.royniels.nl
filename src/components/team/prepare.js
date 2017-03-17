module.exports = (user, drivers, engines, chassis, team) => {

  let output;
  if (Array.isArray(team) && team.length > 0) {
    team = team.pop();
    const now  = new Date();
    const date = team['teams-editDate'];

    output = {
      edit           : now < date,
      id             : team['teams-id'],
      editDate       : team['teams-editDate'],
      secondDriverId : team['teams-secondDriverId'],
      firstDriverId  : team['teams-firstDriverId'],
      engineId       : team['teams-engineId'],
      chassisId      : team['teams-chassisId'],
      name           : team['teams-name']
    };
  }

  return [user, drivers, engines, chassis, output];
}

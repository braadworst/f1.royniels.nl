module.exports = (user, teams, drivers, engines, chassis) => {
  teams = teams.map(team => {
    return {
      name         : team.name,
      user         : user.name,
      firstDriver  : drivers.filter(row => row.id === team.firstDriverId).pop(),
      secondDriver : drivers.filter(row => row.id === team.secondDriverId).pop(),
      engine       : engines.filter(row => row.id === team.engineId).pop(),
      chassis      : chassis.filter(row => row.id === team.chassisId).pop(),
    }
  });

  return [teams];
}

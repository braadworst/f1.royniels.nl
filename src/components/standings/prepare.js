module.exports = teams => {
  totals = {};
  teams = teams.forEach(team => {
    const id = team['teams-id'];
    if (!totals[id]) {
      totals[id] = {
        points : team['standings-points'],
        name   : team['teams-name'],
        user   : team['users-name']
      };
    } else {
      totals[id].points = totals[id].points + team['standings-points'];
    }
  });

  teams = Object
    .keys(totals)
    .map(key => totals[key])
    .sort((a, b) => b.points - a.points)
    .map((team, index) => {
      team.rank = index + 1;
      return team;
    });

  return [ teams ];
}

module.exports = function(statistics = []) {
  return `
  <section id="statistics">
    <h1>Statistics</h1>
    <table>
      <tr>
        <th>User</th>
        <th>Page</th>
        <th>Date</th>
      </tr>
      ${ statistics.map(row).join('') }
    </table>
  </section>
  `;

  function row(stat) {
    return `
    <tr>
      <td>${ stat.name }</td>
      <td>${ stat.path }</td>
      <td>${ stat.date }</td>
    </tr>
    `;
  }
}

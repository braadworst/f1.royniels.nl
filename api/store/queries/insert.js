module.exports = function(database) {

  function prefix(record) {
    let output = {} ;
    Object.keys(record).forEach(key => {
      output['$' + key] = record[key];
    });
    return output;
  }

  return function(table, records) {
    return new Promise((resolve) => {
      // exclude the id and return a list of field names
      const fields = table.fields
        .filter(type => type.field !== 'id')
        .map(type => type.field)
        .join(', ');

      const placeholders = table.fields
        .filter(type => type.field !== 'id')
        .map(type => '$' + type.field)
        .join(', ');

      let statement = database.prepare(`INSERT INTO ${ table.name } (${ fields }) VALUES (${ placeholders })`);
      records.forEach(record => statement.run(prefix(record)));
      statement.finalize();
      console.log('insert into: ' + table.name);
      resolve();
    });
  }
}

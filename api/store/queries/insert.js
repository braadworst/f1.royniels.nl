module.exports = function(database) {

  function prefix(record) {
    let output = {} ;
    Object.keys(record).forEach(key => {
      output['$' + key] = record[key];
    });
    return output;
  }

  return function(table, records) {
    console.log('insert');
    return new Promise((resolve) => {

      // Add all the fields from the schema
      const fields = Object
        .keys(table.properties)
        .map(key => key)
        .join(', ');

      const placeholders = Object
        .keys(table.properties)
        .map(key => '$' + key)
        .join(', ');

      let statement = database.prepare(`INSERT INTO ${ table.title } (${ fields }) VALUES (${ placeholders })`);
      records.forEach(record => statement.run(prefix(record)));
      statement.finalize();
      resolve();
    });
  }
}

module.exports = function(database) {
  return function(table) {
    table = JSON.parse(table);
    return new Promise((resolve, reject) => {

      // Where we store all the table fields
      let fields = [];

      // Add a id field for the table, we don't specify this in the schema, we
      // will add it automatically
      fields.push({
        type    : 'integer',
        name    : 'id',
        primary : true
      });

      // Add all the fields from the schema
      Object
        .keys(table.properties)
        .forEach(key => {
          fields.push({
            type : table.properties[key].type,
            name : key
          });
        });

      // Convert it to string
      fields = table.properties.map(type => {
        return `${ type.name } ${ type.type } ${ type.primary ? 'primary key' : ''}`;
      }).join(', ');

      database.run(
        `CREATE TABLE ${ table.title } (${fields})`,
        [],
        error => {
          if (error) {
            reject(error);
          } else {
            console.log('created: ' + table.title);
            resolve();
          }
        }
      );
    });
  }
}

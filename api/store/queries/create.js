module.exports = function(database) {
  return function(table) {
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
          let output = {
            type : table.properties[key].type,
            name : key,
          };

          if (table.properties[key].maxLength) {
            output.maxLength = table.properties[key].maxLength;
          }
          fields.push(output);
        });

      // Convert it to string
      fields = fields.map(type => {
        return `${ type.name } ${ type.type === 'string' ? 'text' : type.type }${ type.maxLength ? '('+ type.maxLength +')' : '' } ${ type.primary ? 'primary key' : ''}`;
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

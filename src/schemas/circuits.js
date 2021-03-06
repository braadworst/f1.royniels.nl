module.exports = {
  title : 'circuits',
  type  : 'object',
  required : ['name', 'image', 'date'],
  properties : {
    name : {
      type : 'string'
    },
    image : {
      type : 'string'
    },
    date : {
      type : 'string'
    }
  }
};

module.exports = JSON.stringify({
  title : 'engines',
  type  : 'object',
  required : ['name', 'image', 'price'],
  properties : {
    name : {
      type : 'string'
    },
    image : {
      type : 'string'
    },
    price : {
      type : 'integer'
    }
  }
});

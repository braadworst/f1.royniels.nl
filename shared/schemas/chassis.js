module.exports = JSON.stringify({
  title : 'chassis',
  type  : 'object',
  required : ['name', 'image', 'logo', 'price'],
  properties : {
    name : {
      type : 'string'
    },
    image : {
      type : 'string'
    },
    logo : {
      type : 'string'
    },
    price : {
      type : 'integer'
    }
  }
});

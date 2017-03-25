module.exports = {
  title : 'drivers',
  type  : 'object',
  required : ['name', 'image', 'team', 'price'],
  properties : {
    name : {
      type : 'string'
    },
    image : {
      type : 'string'
    },
    team : {
      type : 'string'
    },
    price : {
      type : 'integer'
    },
    chassisId : {
      type : 'integer'
    },
    engineId : {
      type : 'integer'
    }
  }
};

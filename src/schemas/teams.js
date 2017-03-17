module.exports = {
  title : 'teams',
  type  : 'object',
  required : ['name', 'userId', 'firstDriverId', 'secondDriverId', 'engineId', 'chassisId', 'createDate', 'editDate'],
  properties : {
    name : {
      type : 'string',
    },
    userId : {
      type : 'integer'
    },
    firstDriverId : {
      type : 'integer'
    },
    secondDriverId : {
      type : 'integer'
    },
    engineId : {
      type : 'integer'
    },
    chassisId : {
      type : 'integer'
    },
    createDate : {
      type : 'string'
    },
    editEdit : {
      type : 'string'
    }
  }
};

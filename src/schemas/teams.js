module.exports = {
  title : 'teams',
  type  : 'object',
  required : ['name', 'userId', 'firstDriverId', 'secondDriverId', 'engineId', 'chassisId'],
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
    editDate : {
      type : 'integer'
    }
  }
};

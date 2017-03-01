module.exports = JSON.stringify({
  title : 'teams',
  type  : 'object',
  required : ['userId', 'firstDriverId', 'secondDriverId', 'engineId', 'chassisId'],
  properties : {
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
    }
  }
});

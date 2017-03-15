module.exports = {
  title : 'predictions',
  type  : 'object',
  required : ['userId', 'circuitId', 'fastestDriverId', 'bestDriverId'],
  properties : {
    userId : {
      type : 'integer'
    },
    circuitId : {
      type : 'integer'
    },
    fastestDriverId : {
      type : 'integer'
    },
    bestDriverId : {
      type : 'integer'
    }
  }
};

module.exports = {
  title : 'standings',
  type  : 'object',
  required : ['teamId', 'points', 'rank', 'circuitId'],
  properties : {
    circuitId : {
      type : 'integer'
    },
    teamId : {
      type : 'integer'
    },
    rank : {
      type : 'integer'
    },
    points : {
      type : 'integer'
    }
  }
};

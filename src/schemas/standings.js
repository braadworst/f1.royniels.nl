module.exports = {
  title : 'standings',
  type  : 'object',
  required : ['teamId', 'points', 'rank'],
  properties : {
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

module.exports = JSON.stringify({
  title : 'points',
  type  : 'object',
  required : ['teamId', 'points'],
  properties : {
    teamId : {
      type : 'integer'
    },
    points : {
      type : 'integer'
    }
  }
});

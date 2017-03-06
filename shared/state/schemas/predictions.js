module.exports = {
  title : 'predictions',
  type  : 'object',
  required : ['userId', 'fastest', 'best'],
  properties : {
    userId : {
      type : 'integer'
    },
    fastest : {
      type : 'integer'
    },
    best : {
      type : 'integer'
    }
  }
};

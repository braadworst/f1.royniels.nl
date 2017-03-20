module.exports = {
  title : 'statistics',
  type  : 'object',
  required : ['userId', 'path', 'date'],
  properties : {
    userId : {
      type : 'integer'
    },
    path : {
      type : 'string'
    },
    date : {
      type : 'integer'
    },
  }
};

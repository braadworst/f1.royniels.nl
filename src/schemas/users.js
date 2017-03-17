module.exports = {
  title : 'users',
  type  : 'object',
  required : ['email'],
  properties : {
    name : {
      type : 'string',
    },
    email : {
      type : 'string'
    },
    token : {
      type : 'string',
      maxLength: 255
    },
    isAdmin : {
      type : 'boolean',
      default : 'false'
    }
  }
};

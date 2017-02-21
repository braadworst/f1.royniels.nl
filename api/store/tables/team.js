module.exports = {
  name : 'team',
  fields : [{
    field : 'id',
    type  : 'integer',
    primary : true
  },{
    field : 'userId',
    type  : 'integer'
  },{
    field : 'firstDriverId',
    type  : 'integer'
  },{
    field : 'secondDriverId',
    type  : 'integer'
  },{
    field : 'engineId',
    type  : 'integer'
  },{
    field : 'chassisId',
    type  : 'integer'
  }]
};

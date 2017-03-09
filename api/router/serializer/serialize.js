const serializer = require('../../../shared/api/serializer');

module.exports = (request, response, next, relay) => {
  const data = serializer.serialize('drivers');
  console.log('data: ', data);
  next({ data });
}

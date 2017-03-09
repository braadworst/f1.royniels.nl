module.exports = async function(request, response, next) {
  try {
    // console.log(require('../../../shared/api/schemas/' + name));
    // await database.find(require('../../../shared/api/schemas/' + name));
    next();
  } catch (error) {
    next();
  }
}

module.exports = function() {
  const environment = process.env.NODE_ENV;

  return function(type) {
    require(`./${ environment }/${ type }`);
  }
}

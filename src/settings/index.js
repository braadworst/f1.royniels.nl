module.exports = function(type) {
  const environment = process.env.NODE_ENV;

  if (!type) {
    throw new Error('Please provide a type for the settings you want to load');
  }

  return require(`./${ environment }/${ type }`);
}

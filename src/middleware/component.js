module.exports = (name, placeholder) => {
  return async function(request, response, next, relay) {
    try {
      // Get settings

      // Render loading template

      // Load data

      // Manipulate data

      // Build template with data

      // Render loaded template
    } catch (error) {
      console.log('COMPONENT', error);
    }
    next();
  }
}

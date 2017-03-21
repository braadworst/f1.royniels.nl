module.exports = name => {
  return function (request, response, next) {
    // This needs to be a switch, clientside cannot load dynamic names
    connections = relay.connections ? relay.connections : {};
    switch (name) {
      case : 'apiserver' :
        connections.apiserver = require('../connections/apiserver')(relay.settings);
        return;
    }
    next({ connections });
  }
}

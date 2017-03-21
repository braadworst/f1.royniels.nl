module.exports = name => {
  return function (request, response, next) {
    // This needs to be a switch, clientside cannot load dynamic names
    switch (name) {
      case : 'client' :
        next({ settings : require('../../settings/client') });
        return;
      case : 'apiserver' :
        next({ settings : require('../../settings/apiserver') });
        return;
      case : 'webserver' :
        next({ settings : require('../../settings/webserver') });
        return;
    }
  }
}

module.exports = function(server) {

  hooks = {
    get    : {},
    post   : {},
    delete : {},
    update : {},
    before : [],
    after  : []
  };

  // Add listener for requests
  server.on('request', (request, response) => {
    hooks.before.forEach(middleware => middleware(request, response));

    const method = request.method;
    // Remove all get params, we don't use them in matching, split on slash
    const url    = request.url.split('?').shift().split('/');

    // See if there is a match
    const match  = hooks[method].filter(hook => {
      if (url.length !== path.length) {
        return false;
      }
      return hook.parts.static.filter(part => part.value === url[part.index]).length;
    }).pop();

    // 404
    if (!match) {
      response.sendStatus(404);
    }

    // Set the params for the current url
    request.params = {};
    match.parts.variable.forEach(part => {
      request.params[part.value.slice(1)] = url[part.index];
    });

    match.callback(request, response);

    hooks.after.forEach(middleware => middleware(request, response));
  });

  return {
    before(callback) {
      hooks.before.push(callback);
    },
    after(callback) {
      hooks.after.push(callback);
    },
    post(path, callback) {
      hooks.post[path] = {
        parts : parse(path),
        callback
      };
    },
    get(path, callback) {
      hooks.get[path] = {
        parts : parse(path),
        callback
      };
    },
    update(path, callback) {
      hooks.update[path] = {
        parts : parse(path),
        callback
      };
    },
    delete(path, callback) {
      hooks.delete[path] = {
        parts : parse(path),
        callback
      };
    }
  }
}

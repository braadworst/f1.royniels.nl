module.exports = (function() {

  function serialize(resource, type) {
    if (resource.id) {
      const id = resource.id;
      delete resource.id;
      return { type, id, attributes : resource };
    }
    return { type, attributes : resource };
  }

  function parse(resource) {
    if (!resource.id) {
      return Object.assign({}, resource.attributes);
    }
    return Object.assign({}, { id : resource.id }, resource.attributes);
  }

  const exposed = {
    serialize(type, data, errors) {
      // TODO implement the specs better (or to start with)
      if (errors) {
        return { error : errors };
      }
      if (Array.isArray(data)) {
        return { data : data.map(resource => serialize(resource, type)) };
      } else if (data) {
        return { data : serialize(data, type) };
      }
    },
    parse(jsonapi) {
      if (jsonapi.data) {
        if (Array.isArray(jsonapi.data)) {
          return jsonapi.data.map(parse);
        } else if (typeof jsonapi.data === 'object') {
          return parse(jsonapi.data);
        }
      } else {
        return jsonapi;
      }
    }
  };

  return exposed;
}());

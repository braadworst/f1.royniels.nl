module.exports = (function() {

  function serialize(resource, type) {
    const id = resource.id;
    delete resource.id;
    return {
      type,
      id,
      attributes : resource
    };
  }

  function parse(resource) {
    return {};
  }

  const exposed = {
    serialize(type, data) {
      console.log(type, data.length);
      if (Array.isArray(data)) {
        data = data.map(resource => serialize(resource, type));
      } else {
        // data = serialize(data);
      }
      return {
        data
      };
    },
    parse(type, data) {
      return data;
    }
  };

  return exposed;
}());

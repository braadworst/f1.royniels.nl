module.exports = (function() {

  function serialize(resource) {
    return {};
  }

  function deserialize(resource) {
    return {};
  }

  const exposed = {
    serialize(type, data = []) {
      if (typeof data === 'array') {
        data = data.map(serialize)
      } else {
        data = serialize(data);
      }
      return {
        data
      };
    },
    deserialize(type, data) {
      return data;
    }
  };

  return exposed;
}());

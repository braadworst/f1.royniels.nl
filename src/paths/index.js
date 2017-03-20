const paths = require('../settings').paths;

function get(name, ...parameters) {
  if (!paths[name]) {
    throw new Error(`Path with name ${ name } doesn't exist`);
  }
  let path = paths[name];

  return path
    .split('/')
    .map(part => {
      if (part[0] === ':' && parameters.length === 0) {
        throw new Error(`You haven't supplied enought parameters for current path`);
      } else if (part[0] === ':') {
        return parameters.shift();
      }
      return part;
    })
    .join('/');
}

module.exports = Object.assign(paths, { get })

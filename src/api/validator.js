const validator  = require('is-my-json-valid');
const validators = {
  teams       : validator(require('../schemas/teams')),
  users       : validator(require('../schemas/users')),
  results     : validator(require('../schemas/results')),
  predictions : validator(require('../schemas/predictions'))
};

module.exports = function(name, record) {
  let currentValidator = validators[name];
  currentValidator(record);

  return currentValidator.errors;
}

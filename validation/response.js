const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResponse(data) {
  let errors = {};

  if (isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (isEmpty(data.isAccepted)) {
    errors.response = 'Response is required';
  }

  //   if (!Validator.isEmail(data.email)) {
  //     errors.email = 'Email is invalid';
  //   }

  //   if (Validator.isEmpty(data.email)) {
  //     errors.email = 'Email field is required';
  //   }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

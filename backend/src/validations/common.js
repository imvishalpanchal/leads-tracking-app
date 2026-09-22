const yup = require('yup');
const messages = require('../utils/messages');
const REGEX = require('../utils/regex');

const commonValidations = {
  email: yup.string().trim()
    .max(100, messages.VALIDATION.EMAIL_MAX_LENGTH)
    .matches(/^\S+$/, messages.VALIDATION.EMAIL_NO_SPACES)
    .matches(REGEX.EMAIL_REGEX, messages.VALIDATION.EMAIL_INVALID),
  phone: yup.string().trim().max(15, 'Phone cannot exceed 15 characters').nullable()
};

module.exports = commonValidations;

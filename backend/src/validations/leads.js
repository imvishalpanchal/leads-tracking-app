const yup = require('yup');
const messages = require('../utils/messages');
const { email, phone } = require('./common');
const { LEAD_STATUS_OPTIONS } = require('../utils/constants');

const createLeadSchema = yup.object({
  name: yup.string().trim()
    .required(messages.VALIDATION.NAME_REQUIRED)
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: email.required(messages.VALIDATION.EMAIL_REQUIRED),
  phone: phone.optional(),
  status: yup.string().trim().oneOf(LEAD_STATUS_OPTIONS.map(opt => opt.value), messages.VALIDATION.STATUS_INVALID).optional(),
});

const updateLeadSchema = yup.object({
  name: yup.string().trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .optional(),
  email: email.optional(),
  phone: phone.optional(),
  status: yup.string().oneOf(LEAD_STATUS_OPTIONS.map(opt => opt.value), messages.VALIDATION.STATUS_INVALID).optional(),
});

const createNoteSchema = yup.object({
  content: yup.string().trim().required(messages.VALIDATION.NOTE_REQUIRED),
});

module.exports = {
  createLeadSchema,
  updateLeadSchema,
  createNoteSchema,
};

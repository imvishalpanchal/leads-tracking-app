const messages = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
  LEAD_NOT_FOUND: 'Lead not found',
  EMAIL_EXISTS: 'Email already exists',
  ROUTE_NOT_FOUND: 'Route not found',
  LEADS_FETCH_SUCCESS: 'Leads fetched successfully',
  LEAD_DETAILS_FETCH_SUCCESS: 'Lead details fetched successfully',
  LEAD_CREATE_SUCCESS: 'Lead created successfully',
  LEAD_UPDATE_SUCCESS: 'Lead updated successfully',
  LEAD_DELETE_SUCCESS: 'Lead deleted successfully',
  NOTES_FETCH_SUCCESS: 'Notes fetched successfully',
  NOTE_ADD_SUCCESS: 'Note added successfully',
  VALIDATION: {
    NAME_REQUIRED: 'Name is required',
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address.',
    EMAIL_MAX_LENGTH: 'Email cannot exceed 100 characters',
    EMAIL_NO_SPACES: 'Spaces are not applicable for email',
    STATUS_INVALID: 'Invalid status',
    NOTE_REQUIRED: 'Note content is required',
  }
};

module.exports = messages;

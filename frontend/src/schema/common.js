import * as yup from 'yup';

const EMAIL_REGEX = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const commonSchema = {
    email: yup.string().trim()
        .required('Email is required')
        .max(100, 'Email cannot exceed 100 characters')
        .matches(/^\S+$/, 'Spaces are not applicable for email')
        .matches(EMAIL_REGEX, 'Please enter a valid email address.'),
    phone: yup.string().trim().max(15, 'Phone cannot exceed 15 characters').nullable()
};
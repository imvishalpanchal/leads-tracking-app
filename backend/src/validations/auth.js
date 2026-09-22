const yup = require('yup');
const { email } = require('./common');

const loginSchema = yup.object({
    email: email.required('Email is required'),
    password: yup.string().trim().required('Password is required')
});

module.exports = { loginSchema };

const { errors: apiErrors } = require('../config/api/errorHandler');

const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errorDetails = err.inner.map((e) => ({
            field: e.path,
            message: e.message,
        }));
        next(apiErrors.unprocessable('Validation Error', errorDetails));
    }
};

module.exports = { validateRequest };

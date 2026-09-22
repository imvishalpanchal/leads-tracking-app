const { ApiError, errors } = require('../config/api/errorHandler');
const messages = require('../utils/messages');

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(err.toJSON());
    }

    const status = err.statusCode || 500;
    const message = status === 500 ? messages.INTERNAL_SERVER_ERROR : (err.message || 'An unexpected error occurred');

    const apiError = errors.fromError(err, status, 'SERVER');
    apiError.message = message;

    return res.status(apiError.statusCode).json(apiError.toJSON());
};

module.exports = errorHandler;
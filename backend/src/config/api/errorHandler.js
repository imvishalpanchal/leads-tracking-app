class ApiError extends Error {
    constructor(statusCode, message, details = null, errorCode = '', origin = '') {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.details = details;
        this.errorCode = errorCode || '';
        this.origin = origin || '';
        this.isOperational = true;
        this.timestamp = new Date();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }

    static isOperationalError(error) {
        if (error instanceof ApiError) {
            return error.isOperational === true;
        }
        return false;
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            error: {
                name: this.name,
                message: this.message,
                ...(this.details && { details: this.details }),
                ...(this.errorCode && { errorCode: this.errorCode }),
                ...(this.origin && { origin: this.origin }),
                timestamp: this.timestamp.toISOString()
            }
        };
    }

    toString() {
        return `${this.name} [${this.statusCode}]: ${this.message}${this.errorCode ? ` (${this.errorCode})` : ''}`;
    }

    [Symbol.for('nodejs.util.inspect.custom')]() {
        return {
            name: this.name,
            statusCode: this.statusCode,
            message: this.message,
            ...(this.details && { details: this.details }),
            ...(this.errorCode && { errorCode: this.errorCode }),
            ...(this.origin && { origin: this.origin }),
            isOperational: this.isOperational,
            timestamp: this.timestamp.toISOString()
        };
    }

    withCause(cause) {
        this.cause = cause;
        return this;
    }

    withMeta(meta) {
        this.meta = { ...this.meta, ...meta };
        return this;
    }
}

const apiError = (statusCode, message, details = null, errorCode = '', origin = '') => {
    return new ApiError(statusCode, message, details, errorCode, origin);
};

const errors = {
    badRequest: (message = 'Bad Request', details = null, errorCode = '') =>
        apiError(400, message, details, errorCode, 'CLIENT'),

    unauthorized: (message = 'Unauthorized', details = null, errorCode = '') =>
        apiError(401, message, details, errorCode, 'AUTH'),

    forbidden: (message = 'Forbidden', details = null, errorCode = '') =>
        apiError(403, message, details, errorCode, 'AUTH'),

    notFound: (message = 'Not Found', details = null, errorCode = '') =>
        apiError(404, message, details, errorCode, 'CLIENT'),

    unprocessable: (message = 'Unprocessable Entity', details = null, errorCode = '') =>
        apiError(422, message, details, errorCode, 'VALIDATION'),

    tooManyRequests: (message = 'Too Many Requests', details = null, errorCode = '') =>
        apiError(429, message, details, errorCode, 'RATE_LIMIT'),

    conflict: (message = 'Conflict', details = null, errorCode = '') =>
        apiError(409, message, details, errorCode, 'CLIENT'),

    internal: (message = 'Internal Server Error', details = null, errorCode = '') =>
        apiError(500, message, details, errorCode, 'SERVER'),

    notImplemented: (message = 'Not Implemented', details = null, errorCode = '') =>
        apiError(501, message, details, errorCode, 'SERVER'),

    serviceUnavailable: (message = 'Service Unavailable', details = null, errorCode = '') =>
        apiError(503, message, details, errorCode, 'SERVER'),

    gatewayTimeout: (message = 'Gateway Timeout', details = null, errorCode = '') =>
        apiError(504, message, details, errorCode, 'SERVER'),

    fromError: (error, statusCode = 500, origin = 'UNKNOWN') => {
        if (error instanceof ApiError) return error;

        const apiErr = new ApiError(
            statusCode,
            error?.message || 'An unexpected error occurred',
            null,
            error?.code || '',
            origin
        );
        apiErr.cause = error;
        return apiErr;
    }
};

module.exports = { ApiError, errors };

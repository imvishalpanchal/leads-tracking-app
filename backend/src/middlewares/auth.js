const jwt = require('jsonwebtoken');
const { errors } = require('../config/api/errorHandler');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(errors.unauthorized('Authentication token is missing'));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return next(errors.unauthorized('Authentication token is missing'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev_only');
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(errors.unauthorized('Authentication token has expired'));
    }
    return next(errors.unauthorized('Invalid authentication token'));
  }
};

module.exports = authMiddleware;

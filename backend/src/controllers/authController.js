const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { errors } = require('../config/api/errorHandler');
const ApiResponse = require('../config/api/sendResponse');
const prisma = require('../config/database/prismaClient');

const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return next(errors.unauthorized('Invalid email or password'));
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(errors.unauthorized('Invalid email or password'));
      }
      
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role }, 
        process.env.JWT_SECRET || 'fallback_secret_for_dev_only', 
        { expiresIn: '24h' }
      );
      
      return ApiResponse.details(res, 200, 'Login successful', { 
        token, 
        user: { id: user.id, email: user.email, role: user.role } 
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;

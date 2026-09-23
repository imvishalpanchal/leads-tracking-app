const express = require('express');
const authController = require('../controllers/auth');
const { validateRequest } = require('../utils/yup');
const { loginSchema } = require('../validations/auth');

const router = express.Router();

router.post('/login', validateRequest(loginSchema), authController.login);

module.exports = router;

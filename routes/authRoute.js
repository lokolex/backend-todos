const { Router } = require('express');
require('dotenv').config();

const checkAuth = require('../middlewares/checkAuth');
const UserController = require('../controllers/UserController');
const { registerValidation, loginValidation } = require('../validations');
const handleValidationErrors = require('../middlewares/handleValidationErrors');

const router = Router();

router.post('/register', registerValidation, handleValidationErrors, UserController.register);

router.post('/login', loginValidation, handleValidationErrors, UserController.login);

router.get('/me', checkAuth, UserController.getMe);

module.exports = router;

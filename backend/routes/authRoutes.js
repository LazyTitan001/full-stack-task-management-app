const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');   
const { validate, authValidation } = require('../middleware/validate');

router.post('/register', authValidation.register, validate, register);
router.post('/login', authValidation.login, validate, login);

module.exports = router;
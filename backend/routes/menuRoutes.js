const express = require('express');
const router = express.Router();
const { getAllMenu } = require('../controllers/menuController');
const { auth } = require('../middleware/auth');

// user menu routes
router.get('/', auth, getAllMenu);
module.exports = router;
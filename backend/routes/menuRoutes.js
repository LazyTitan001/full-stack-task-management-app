const express = require('express');
const router = express.Router();
const { getAllMenu, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { auth } = require('../middleware/auth');
const { menuValidation, validate } = require('../middleware/validate');

// Public route
router.get('/', getAllMenu);

// Protected routes
router.post('/', auth, menuValidation, validate, createMenuItem);
router.put('/:id', auth, menuValidation, validate, updateMenuItem);
router.delete('/:id', auth, deleteMenuItem);

module.exports = router;
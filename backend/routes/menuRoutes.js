const express = require('express');
const router = express.Router();
const { getAllMenu, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { auth } = require('../middleware/auth');
const { menuValidation, validate } = require('../middleware/validate');


router.get('/', getAllMenu);

module.exports = router;
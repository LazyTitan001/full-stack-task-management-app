const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { auth } = require('../middleware/auth');
const { validate, orderValidation } = require('../middleware/validate');

// user order routes
router.post('/orders', auth, orderValidation.createOrder, validate, createOrder);
router.get('/orders', auth, getUserOrders);

module.exports = router;
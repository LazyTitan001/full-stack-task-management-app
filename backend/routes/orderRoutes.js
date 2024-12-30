const express = require('express');
const router = express.Router();
const { 
  createOrder,
  getUserOrders
} = require('../controllers/orderController');
const auth = require('../middleware/auth');
const { validate, orderValidation } = require('../middleware/validate');

router.post('/order', orderValidation, validate, createOrder);
router.get('/orders', auth, getUserOrders);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { auth } = require('../middleware/auth');
const { validate, orderValidation } = require('../middleware/validate');

// All order routes are protected
router.use(auth);

router.post('/', orderValidation.createOrder, validate, createOrder);
router.get('/user', getUserOrders);


module.exports = router;
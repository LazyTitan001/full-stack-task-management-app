const express = require('express');
const router = express.Router();
const { 
  getAllOrders, 
  updateOrderStatus 
} = require('../controllers/orderController');
const { 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem 
} = require('../controllers/menuController');
const adminKey = require('../middleware/adminKey');
const { validate, validateObjectId, menuValidation } = require('../middleware/validate');

// Protected Routes
router.use(adminKey);

// Order Management Routes
router.get('/orders', getAllOrders);
router.put('/orders/:id', validateObjectId, updateOrderStatus);

// Menu Management Routes
router.post('/menu', menuValidation, validate, createMenuItem);
router.put('/menu/:id', validateObjectId, menuValidation, validate, updateMenuItem);
router.delete('/menu/:id', validateObjectId, deleteMenuItem);

module.exports = router;

const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const { adminLogin } = require('../controllers/adminController');
const { 
  getAllOrders, 
  updateOrderStatus 
} = require('../controllers/orderController');
const { 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem 
} = require('../controllers/menuController');
const { validate, validateObjectId, menuValidation } = require('../middleware/validate');


router.post('/login', adminLogin);

router.use(adminAuth);


router.get('/orders', getAllOrders);
router.put('/orders/:id', validateObjectId, updateOrderStatus);


router.post('/menu', menuValidation, validate, createMenuItem);
router.put('/menu/:id', validateObjectId, menuValidation, validate, updateMenuItem);
router.delete('/menu/:id', validateObjectId, deleteMenuItem);

module.exports = router;

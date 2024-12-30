const express = require('express');
const router = express.Router();
const { 
  getAllMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

const auth = require('../middleware/auth');
const { validate, validateObjectId, menuValidation } = require('../middleware/validate');

router.get('/', getAllMenu);
router.post('/', auth, menuValidation, validate, createMenuItem);
router.put('/:id', auth, validateObjectId, menuValidation, validate, updateMenuItem);
router.delete('/:id', auth, validateObjectId, deleteMenuItem);

module.exports = router;
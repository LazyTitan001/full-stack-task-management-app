const Order = require('../models/Order');
const Menu = require('../models/Menu');
const { validate, orderValidation } = require('../middleware/validate');

exports.createOrder = [
  orderValidation,
  validate,
  async (req, res) => {
    try {
      const { items } = req.body;
      
      // Calculate total amount
      let totalAmount = 0;
      for (let item of items) {
        const menuItem = await Menu.findById(item.menuItem);
        if (!menuItem || !menuItem.availability) {
          return res.status(400).json({ 
            message: `Menu item ${item.menuItem} not available` 
          });
        }
        totalAmount += menuItem.price * item.quantity;
      }

      const order = await Order.create({
        userId: req.user.userId,
        items,
        totalAmount
      });

      await order.populate('items.menuItem');
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

exports.getUserOrders = async (req, res) => {
  try {
    const { search, status, sortBy = 'createdAt', order = 'desc' } = req.query;
    const sortOrder = order === 'desc' ? -1 : 1;

    const query = { userId: req.user.userId };
    if (search) {
      query['items.menuItem.name'] = { $regex: search, $options: 'i' }; 
    }
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate('items.menuItem')
      .sort({ [sortBy]: sortOrder });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
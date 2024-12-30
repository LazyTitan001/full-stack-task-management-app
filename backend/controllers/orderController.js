const Order = require('../models/Order');
const Menu = require('../models/Menu');

exports.createOrder = async (req, res) => {
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
};

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

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItem').populate('userId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
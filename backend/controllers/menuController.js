const Menu = require('../models/Menu');
const { validate, menuValidation } = require('../middleware/validate');

exports.getAllMenu = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'name';
    const order = req.query.order === 'desc' ? -1 : 1;
    
    const menu = await Menu.find().sort({ [sortBy]: order });
    
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createMenuItem = [
  menuValidation,
  validate,
  async (req, res) => {
    try {
      const menuItem = await Menu.create(req.body);
      res.status(201).json(menuItem);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

exports.updateMenuItem = [
  menuValidation,
  validate,
  async (req, res) => {
    try {
      const menuItem = await Menu.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }

      res.json(menuItem);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({ message: `Menu item '${menuItem.name}' deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
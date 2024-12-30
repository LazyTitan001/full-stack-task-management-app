const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validate, authValidation } = require('../middleware/validate');

exports.register = [
  authValidation.register,
  validate,
  async (req, res) => {
    try {
      const { username, password } = req.body;

      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        username,
        password: hashedPassword
      });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

exports.login = [
  authValidation.login,
  validate,
  async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );
};

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      username,
      password: hashedPassword,
      role
    });

    const token = generateToken(user._id);
    
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const token = generateToken(user._id);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
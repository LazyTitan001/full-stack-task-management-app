const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateAdminToken = (adminId) => {
  return jwt.sign(
    { adminId },
    process.env.ADMIN_JWT_SECRET,
    { expiresIn: '8h' }
  );
};

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateAdminToken(admin._id);

    res.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin._id,
          username: admin.username
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Initialize admin account (run this once)
exports.initializeAdmin = async () => {
  try {
    const adminExists = await Admin.countDocuments();
    if (adminExists === 0) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_INITIAL_PASSWORD, 10);
      await Admin.create({
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword
      });
      console.log('Admin account initialized');
    }
  } catch (error) {
    console.error('Error initializing admin account:', error);
  }
};

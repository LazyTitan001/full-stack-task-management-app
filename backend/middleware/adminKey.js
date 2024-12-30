const adminKey = (req, res, next) => {
  const key = req.header('x-admin-key');
  if (key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ message: 'Invalid admin key' });
  }
  next();
};

module.exports = adminKey;

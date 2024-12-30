const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

// ObjectId validation
const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }
  next();
};

// Validation schemas
const authValidation = {
  register: [
    body('username')
      .notEmpty().withMessage('Username is required')
      .trim()
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  login: [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ]
};

const menuValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .trim(),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['Appetizers', 'Main Course', 'Desserts', 'Beverages']).withMessage('Invalid category'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('availability')
    .optional()
    .isBoolean().withMessage('Availability must be true or false')
];

const orderValidation = [
  body('items')
    .isArray().withMessage('Items must be an array')
    .notEmpty().withMessage('Order must contain at least one item'),
  body('items.*.menuItem')
    .isMongoId().withMessage('Invalid menu item ID'),
  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

module.exports = {
  validate,
  validateObjectId,
  authValidation,
  menuValidation,
  orderValidation
};
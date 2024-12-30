const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  availability: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  stock: { // Added stock field
    type: Number,
    required: true,
    default: 0,
  },
  category: { // Added category field
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Pending',
  },
});

module.exports = mongoose.model('Order', OrderSchema);

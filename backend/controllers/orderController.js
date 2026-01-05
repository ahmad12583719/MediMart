const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create an order
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res, next) => {
    try {
        const order = await Order.create(req.body);

        const product = await Product.findOne({ name: req.body.item });
        if (product) {
            product.stock -= req.body.qty || 1;
            await product.save();
        }

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


// @desc    Update an order
// @route   PUT /api/orders/:id
// @access  Public
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(400).json({ success: false });
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (req.body.status === 'Delivered') {
      const user = await User.findOne({ username: order.customer });
      if (user) {
        user.totalSpent += order.price;
        await user.save();
      }
    }

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Public
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

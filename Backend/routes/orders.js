const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.id }).populate('items.product_id');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      product_id: item.product_id._id,
      quantity: item.quantity,
      price: item.product_id.price
    }));

    const totalAmount = orderItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );

    const order = new Order({
      user_id: req.user.id,
      items: orderItems,
      total_amount: totalAmount
    });

    await order.save();
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id })
      .populate('items.product_id')
      .sort({ created_at: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;
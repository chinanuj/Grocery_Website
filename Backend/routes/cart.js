const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user_id: req.user.id }).populate('items.product_id');
    if (!cart) {
      cart = { items: [] };
    }
    res.json({ cart: cart.items });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

router.post('/add', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user_id: req.user.id });
    if (!cart) {
      cart = new Cart({ user_id: req.user.id, items: [] });
    }
    console.log(cart.items, req.body.product_id);
    const existingItem = cart.items.find(item => 
      item.product_id.toString() === Product.findone(_id == item._id)
    );
    console.log(existingItem);

    if (existingItem) {
      existingItem.quantity += req.body.quantity;
    } 
    
    else {
      cart.items.push({
        product_id: req.body.product_id,
        quantity: req.body.quantity
      });
    }
    await cart.save({validateBeforeSave: false});
    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

router.delete('/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => 
      item.product_id.toString() !== req.params.productId
    );

    await cart.save();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});

module.exports = router;

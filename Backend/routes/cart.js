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
    
    const existingItem = cart.items.find(item => 
      item.product_id.toString() === req.body.product_id
    );
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

    const itemIndex = cart.items.findIndex(item => 
      item.product_id.toString() === req.params.productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.json({ message: 'Item updated in cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item in cart' });
  }
});

module.exports = router;

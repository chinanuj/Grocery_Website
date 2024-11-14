const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'public/images/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Get All Products with Search
router.get('/', async (req, res) => {
  try {
    const { category, priceRange, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (priceRange) filter.price = { $gte: priceRange.split('-')[0], $lte: priceRange.split('-')[1] };
    if (search) filter.name = { $regex: search, $options: 'i' };

    const products = await Product.find(filter);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get Single Product
router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Product with Image Upload
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      image_url: req.file ? req.file.filename : null,
    });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

module.exports = router;
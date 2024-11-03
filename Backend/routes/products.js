const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
  
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    console.log(req.body);
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'public/images/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Add to your product creation route
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      image_url: req.file ? req.file.filename : null
    });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});


module.exports = router;
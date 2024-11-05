const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: { type: String },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

productSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Product', productSchema);
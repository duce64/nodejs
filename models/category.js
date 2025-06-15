const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  idCategory: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  // image: String, // base64 hoặc URL
});

module.exports = mongoose.model('Category', categorySchema);

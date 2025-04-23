const mongoose = require('mongoose');

const questionPackageSchema = new mongoose.Schema({
  idQuestion: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  idCategory: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('QuestionPackage', questionPackageSchema);

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  correct_answer: {
    type: String,
    required: true
  },
  incorrect_answers: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.length >= 1;
      },
      message: 'Phải có ít nhất 1 đáp án sai.'
    }
  },
  categoryId: {
    type: Number,
    required: true
  },
  idQuestionPackage: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Question', questionSchema);

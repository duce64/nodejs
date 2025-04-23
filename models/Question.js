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
        return arr.length === 3;
      },
      message: 'Phải có đúng 3 đáp án sai.'
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

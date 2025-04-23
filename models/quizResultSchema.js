const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  status: { type: String, enum: ['Passed', 'Failed'], required: true },
  date: { type: Date, required: true },
  categoryId: { type: Number, required: true },
  questionId: { type: Number, required: true }, // Kiểu Number thay vì ObjectId
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('ExamResult', examResultSchema);

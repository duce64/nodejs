const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  status: { type: String, enum: ['Passed', 'Failed'], required: true },
  date: { type: Date, required: true },
  categoryId: { type: Number, required: true },
  questionId: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isTest: { type: Boolean, default: false }, // ✅ thêm trường này để phân biệt bài kiểm tra chính thức
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' }, // ✅ liên kết đến bài kiểm tra
});
module.exports = mongoose.model('ExamResult', examResultSchema); 

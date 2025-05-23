// models/Test.js
const mongoose = require('mongoose');
const category = require('./category');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questionPackageId: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  categoryId: { type: Number, required: true }, // người tạo bài kiểm tra  
  timeLimit: { type: Number, default: 60 }, // ⬅️ thời gian làm bài (tính bằng phút)
  questionCount: { type: Number, default: 10 }, // ⬅️ số lượng câu hỏi
  selectedUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model('Test', testSchema);

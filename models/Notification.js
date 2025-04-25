const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  expiredDate: {
    type: Date,
    default: Date.now
  },
  questionId: {
    type: Number,
    required: false // Nếu không cần bắt buộc
  },
  idTest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: false // ✅ Trường mới để biết notification thuộc bài kiểm tra nào
  },
  isRead: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Notification', notificationSchema);

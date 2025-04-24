// models/notification.js hoặc notificationSchema.js

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
    required: true // Có thể để false nếu muốn thông báo chung
  },
  isRead: { type: Boolean, default: false }, // Thêm trường này
});

module.exports = mongoose.model('Notification', notificationSchema);

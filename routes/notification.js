const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification"); // model chứa thông báo
const Question = require('../models/QuestionPackage');
const rateLimit = require('express-rate-limit');

// Giới hạn: tối đa 100 request mỗi 15 phút
const categoryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
});

// Áp dụng middleware cho toàn bộ route
router.use(categoryLimiter);

// GET /api/notifications/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId }).sort({ date: -1 });

    // Gắn thêm categoryId cho mỗi notification
    const notificationsWithCategory = await Promise.all(
      notifications.map(async (notif) => {
        let categoryId = null;

        try {
          const pkg = await Question.findOne({ idQuestion: notif.questionId });
          console.log("pkg:", pkg);
          if (pkg) {
            categoryId = pkg.idCategory;
          }
        } catch (err) {
          console.warn("Không tìm thấy categoryId cho questionId:", notif.questionId);
        }

        return {
          _id: notif._id,
          content: notif.content,
          userId: notif.userId,
          date: notif.date,
          questionId: notif.questionId,
          categoryId: categoryId,
          isRead: notif.isRead,
          expiredDate: notif.expiredDate,
          idTest: notif.idTest,
        };
      })
    );

    res.status(200).json(notificationsWithCategory);
  } catch (err) {
    console.error("Lỗi lấy thông báo:", err);
    res.status(500).json({ error: 'Không thể lấy thông báo.' });
  }
});
// Đánh dấu 1 thông báo là đã đọc
router.put('/mark-read/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Thông báo không tồn tại' });
    }

    res.status(200).json({ message: 'Đã đánh dấu là đã đọc', notification: updated });
  } catch (error) {
    console.error("Lỗi đánh dấu đã đọc:", error);
    res.status(500).json({ error: 'Không thể đánh dấu thông báo' });
  }
});
// PUT /api/notifications/:id/read
router.put('/:id/read', async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.status(200).json(notif);
  } catch (error) {
    console.error("Lỗi cập nhật read:", error);
    res.status(500).json({ error: 'Cập nhật trạng thái đọc thất bại' });
  }
});

module.exports = router;
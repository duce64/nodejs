const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification"); // model chứa thông báo
const Question = require('../models/QuestionPackage');

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
          read: notif.read,
        };
      })
    );

    res.status(200).json(notificationsWithCategory);
  } catch (err) {
    console.error("Lỗi lấy thông báo:", err);
    res.status(500).json({ error: 'Không thể lấy thông báo.' });
  }
});

module.exports = router;
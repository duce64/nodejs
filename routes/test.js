const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Test = require("../models/testSchema");
const Notification = require("../models/Notification");
const User = require("../models/user");
// ✅ Tạo bài kiểm tra mới (có timeLimit và questionCount)
const rateLimit = require('express-rate-limit');

// Giới hạn: tối đa 100 request mỗi 15 phút
const categoryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
});

// Áp dụng middleware cho toàn bộ route
router.use(categoryLimiter);

router.post("/create", async (req, res) => {
  try {
    const {
      title,
      questionPackageId,
      selectedUsers,
      expiredDate,
      department,
      userId,
      categoryId,
      timeLimit,        // ⬅️ thêm thời gian làm bài
      questionCount     // ⬅️ thêm số lượng câu hỏi
    } = req.body;

    if (!title || !questionPackageId || !selectedUsers || !expiredDate || !userId || !categoryId) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc (title, package, users...)." });
    }

    const test = new Test({
      title,
      questionPackageId,
      users: selectedUsers,
      // gán vào users
      selectedUserIds: selectedUsers, // 🆕 gán vào trường mới
      deadline: expiredDate,
      department,
      userId,
      categoryId,
      timeLimit,      // ⬅️ gán vào model
      questionCount   // ⬅️ gán vào model
    });

    await test.save();

    // ✅ Tạo thông báo cho từng người dùng
    for (const userId of selectedUsers) {
      if (!userId) {
        console.warn("Bỏ qua userId không hợp lệ:", userId);
        continue;
      }

      await Notification.create({
        content: `Bạn có bài kiểm tra mới: ${title}`,
        userId,
        date: new Date(),
        expiredDate: expiredDate,
        questionId: questionPackageId,
        idTest: test._id,
      });
    }

    res.status(201).json({ message: "Tạo bài kiểm tra thành công." });
  } catch (error) {
    console.error("❌ Lỗi tạo kiểm tra:", error);
    res.status(500).json({ error: "Tạo kiểm tra thất bại.", details: error.message });
  }
});

// GET /api/tests
router.get("/", async (req, res) => {
    try {
        const tests = await Test.find().sort({ createdAt: -1 });

      res.json(tests);
    } catch (error) {
      res.status(500).json({ error: "Không thể lấy danh sách bài kiểm tra" });
    }
  });
// DELETE /api/tests/:id
router.delete("/:id", async (req, res) => {
    try {
      const deleted = await Test.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Không tìm thấy bài kiểm tra" });
  
      res.json({ message: "Đã xóa bài kiểm tra thành công" });
    } catch (error) {
      res.status(500).json({ error: "Lỗi khi xóa bài kiểm tra" });
    }
  });
// PUT /api/tests/:id
router.put("/:id", async (req, res) => {
  const { title, questionPackageId, selectedUsers, expiredDate, department, categoryId, questionCount, timeLimit } = req.body;

  if (!title || !questionPackageId || !selectedUsers || !expiredDate || !department) {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc để cập nhật" });
  }

  try {
    const updated = await Test.findByIdAndUpdate(
      req.params.id,
      {
        title,
        questionPackageId,
        users: selectedUsers,         // ⚡ map đúng field users
        deadline: expiredDate,         // ⚡ map đúng field deadline
        department,
        categoryId,
        questionCount,
        timeLimit
      },
      { new: true } // ⚡ trả về document mới sau update
    );

    if (!updated) {
      return res.status(404).json({ error: "Không tìm thấy bài kiểm tra" });
    }

    res.json({ message: "Cập nhật bài kiểm tra thành công", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật bài kiểm tra" });
  }
});

      // GET /api/tests/ongoing
      router.get("/ongoing", async (req, res) => {
        try {
          const now = new Date();
          const { userId } = req.query; // 🆕 lấy userId từ query params (hoặc bạn có thể lấy từ token/session nếu cần)
      
          if (!userId) {
            return res.status(400).json({ error: "Thiếu userId." });
          }
      
          const ongoingTests = await Test.find({
            deadline: { $gt: now },
            selectedUserIds: userId, // 🆕 chỉ lấy bài kiểm tra có user trong selectedUserIds
          }).sort({ deadline: 1 });
      
          res.json(ongoingTests);
        } catch (error) {
          console.error("❌ Lỗi lấy bài kiểm tra đang diễn ra:", error);
          res.status(500).json({ error: "Không thể lấy bài kiểm tra đang diễn ra" });
        }
      });
// ✅ API lấy danh sách bài kiểm tra đã hết hạn theo userId
router.get("/expired", async (req, res) => {
  try {
    const now = new Date();
    const { userId } = req.query; // 🔥 lấy userId từ query param

    if (!userId) {
      return res.status(400).json({ error: "Thiếu userId." });
    }

    const expiredTests = await Test.find({
      deadline: { $lt: now },       // 🔥 bài hết hạn
      selectedUserIds: userId        // 🔥 chỉ bài có userId trong danh sách
    }).sort({ deadline: -1 });       // sắp xếp từ mới đến cũ

    res.json(expiredTests);
  } catch (error) {
    console.error("❌ Lỗi lấy bài kiểm tra đã hết hạn:", error);
    res.status(500).json({ error: "Không thể lấy danh sách bài kiểm tra đã hết hạn." });
  }
});


module.exports = router;

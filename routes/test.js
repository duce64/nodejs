const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Test = require("../models/testSchema");
const Notification = require("../models/Notification");
const User = require("../models/user");
// ✅ Tạo bài kiểm tra mới (có timeLimit và questionCount)
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
    const { title, questionPackageId, users, expiredDate, department } = req.body;
  
    if (!title || !questionPackageId || !users || !expiredDate) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc để cập nhật" });
    }
  
    try {
      const updated = await Test.findByIdAndUpdate(
        req.params.id,
        { title, questionPackageId, users, expiredDate, department },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ error: "Không tìm thấy bài kiểm tra" });
  
      res.json({ message: "Cập nhật thành công", updated });
    } catch (error) {
      res.status(500).json({ error: "Lỗi khi cập nhật bài kiểm tra" });
    }
  });
      // GET /api/tests/ongoing
router.get("/ongoing", async (req, res) => {
  try {
    const now = new Date();

    const ongoingTests = await Test.find({ deadline: { $gt: now } })
      .sort({ deadline: 1 });

    res.json(ongoingTests);
  } catch (error) {
    console.error("❌ Lỗi lấy bài kiểm tra đang diễn ra:", error);
    res.status(500).json({ error: "Không thể lấy bài kiểm tra đang diễn ra" });
  }
});
// ✅ API lấy danh sách bài kiểm tra đã hết hạn
router.get("/expired", async (req, res) => {
  try {
    const now = new Date(); // thời gian hiện tại
    const expiredTests = await Test.find({
      deadline: { $lt: now } // deadline nhỏ hơn hiện tại => đã hết hạn
    }).sort({ deadline: -1 }); // sắp xếp từ mới nhất đến cũ nhất

    res.json(expiredTests);
  } catch (error) {
    console.error("❌ Lỗi lấy bài kiểm tra đã hết hạn:", error);
    res.status(500).json({ error: "Không thể lấy danh sách bài kiểm tra đã hết hạn." });
  }
});

module.exports = router;

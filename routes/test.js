const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Test = require("../models/testSchema");
const Notification = require("../models/Notification");
const User = require("../models/user");

// ✅ Tạo bài kiểm tra mới
router.post("/create", async (req, res) => {
  try {
    const {
        title,
        questionPackageId,
        selectedUsers,
        expiredDate, // từ client
        department,
        userId // người tạo bài kiểm tra
      } = req.body;
      
      if (!title || !questionPackageId || !selectedUsers || !expiredDate || !userId) {
        return res.status(400).json({ error: "Thiếu thông tin bắt buộc (title, package, users...)." });
      }
      
      const test = new Test({
        title,
        questionPackageId,
        users: selectedUsers,
        deadline: expiredDate, // gán đúng key
        department,
        userId
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
        expiredDate: expiredDate, // thêm trường này để client nhận biết
        questionId: questionPackageId, // thêm trường này để client nhận biết
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
      
module.exports = router;

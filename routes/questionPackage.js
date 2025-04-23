const express = require('express');
const router = express.Router();
const Question = require('../models/QuestionPackage');


// Thêm gói câu hỏi
router.post('/add', async (req, res) => {
  try {
    const lastQuestion = await Question.findOne().sort({ idQuestion: -1 }).limit(1);
    const newId = lastQuestion?.idQuestion ? lastQuestion.idQuestion + 1 : 1;

    const newQuestion = new Question({
      idQuestion: newId,
      name: req.body.name,
      idCategory: req.body.idCategory,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server khi thêm gói câu hỏi' });
  }
});

// Lấy tất cả gói câu hỏi
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi lấy danh sách gói câu hỏi' });
  }
});

// Lấy theo idCategory
router.get('/by-category/:idCategory', async (req, res) => {
  try {
    const idCategory = parseInt(req.params.idCategory);
    const questions = await Question.find({ idCategory }).select('idQuestion name');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi lọc gói câu hỏi theo category' });
  }
});

// Sửa gói câu hỏi theo idQuestion
router.put('/update/:idQuestion', async (req, res) => {
  try {
    const updated = await Question.findOneAndUpdate(
      { idQuestion: parseInt(req.params.idQuestion) },
      {
        name: req.body.name,
        idCategory: req.body.idCategory,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Không tìm thấy gói câu hỏi' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi cập nhật gói câu hỏi' });
  }
});

// Xóa gói câu hỏi theo idQuestion
router.delete('/delete/:idQuestion', async (req, res) => {
  try {
    const deleted = await Question.findOneAndDelete({ idQuestion: parseInt(req.params.idQuestion) });

    if (!deleted) {
      return res.status(404).json({ error: 'Không tìm thấy gói câu hỏi để xóa' });
    }

    res.json({ message: 'Đã xóa gói câu hỏi thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi xóa gói câu hỏi' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const rateLimit = require('express-rate-limit');

// Giới hạn: tối đa 100 request mỗi 15 phút
const categoryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
});

// Áp dụng middleware cho toàn bộ route
router.use(categoryLimiter);

// Lấy idQuestion lớn nhất hiện tại và tăng lên 1
const getNextQuestionId = async () => {
  const latest = await Question.findOne().sort({ idQuestion: -1 });
  return latest ? latest.idQuestion + 1 : 1;
};

// POST /api/questions
router.post('/', async (req, res) => {
  try {
    const { categoryId, category, question, correct_answer, incorrect_answers } = req.body;

    // Validate
    if (!categoryId || !category || !question || !correct_answer || !incorrect_answers || incorrect_answers.length !== 3) {
      return res.status(400).json({ message: 'Thiếu dữ liệu hợp lệ.' });
    }

    const nextId = await getNextQuestionId();

    const newQuestion = new Question({
      categoryId,
      idQuestion: nextId,
      category,
      question,
      correct_answer,
      incorrect_answers,
    });

    await newQuestion.save();
    res.status(201).json({ message: 'Thêm câu hỏi thành công!', question: newQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi thêm câu hỏi.' });
  }
});
// API tạo nhiều câu hỏi
router.post("/bulk", async (req, res) => {
    try {
      const questions = req.body.questions;
  
      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: "Danh sách câu hỏi không hợp lệ" });
      }
  
      const savedQuestions = await Question.insertMany(questions);
      res.status(201).json(savedQuestions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi server khi thêm câu hỏi" });
    }
  });
  router.post('/add-questions', async (req, res) => {
    try {
      const questions = req.body;
  
      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: 'Danh sách câu hỏi không hợp lệ.' });
      }
  
      const insertList = [];
      const errors = [];
  
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const {
          question,
          correct_answer,
          incorrect_answers,
          categoryId,
          idQuestionPackage
        } = q;
  
        // Validate cơ bản
        if (
          typeof categoryId !== 'number' ||
          typeof idQuestionPackage !== 'number' ||
          typeof question !== 'string' ||
          typeof correct_answer !== 'string' ||
          !Array.isArray(incorrect_answers) ||
          incorrect_answers.length !== 3
        ) {
          errors.push(`Câu hỏi thứ ${i + 1} không hợp lệ: ${JSON.stringify(q)}`);
          continue;
        }
  
        insertList.push({
          name: question,
          correct_answer,
          incorrect_answers,
          categoryId,
          idQuestionPackage
        });
      }
  
      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Có lỗi trong danh sách câu hỏi.',
          errors
        });
      }
  
      await Question.insertMany(insertList);
      res.status(200).json({ message: 'Thêm tất cả câu hỏi thành công.' });
    } catch (error) {
      console.error('Lỗi khi thêm danh sách câu hỏi:', error);
      res.status(500).json({ message: 'Lỗi server khi thêm câu hỏi.' });
    }
  });
  // Lấy danh sách câu hỏi theo idQuestionPackage
  router.get('/package/:id', async (req, res) => {
    try {
      const packageId = parseInt(req.params.id);
      const numberQuestion = parseInt(req.query.numberQuestion); // ✅ Lấy từ query param
  
      let questions = await Question.find({ idQuestionPackage: packageId });
  
      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: 'No questions found for this package ID.' });
      }
  
      // ✅ Nếu numberQuestion hợp lệ và nhỏ hơn số câu, thì random
      if (!isNaN(numberQuestion) && numberQuestion < questions.length) {
        // Shuffle và chọn ngẫu nhiên
        questions = questions.sort(() => 0.5 - Math.random()).slice(0, numberQuestion);
      }
  
      res.status(200).json({ result: questions });
    } catch (error) {
      console.error('Error getting questions by package ID:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
// DELETE /api/questions/package/:packageId
router.delete('/package/:packageId', async (req, res) => {
  const { packageId } = req.params;

  if (!packageId || isNaN(Number(packageId))) {
    return res.status(400).json({ message: 'ID gói câu hỏi không hợp lệ.' });
  }

  try {
    const result = await Question.deleteMany({ idQuestionPackage: Number(packageId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy câu hỏi nào để xóa.' });
    }

    res.status(200).json({
      message: `Đã xóa ${result.deletedCount} câu hỏi thuộc gói ${packageId}.`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi xóa câu hỏi.' });
  }
});
// DELETE /api/questions/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy câu hỏi để xóa.' });
    }

    res.status(200).json({ message: 'Xóa câu hỏi thành công.' });
  } catch (error) {
    console.error('Lỗi khi xóa câu hỏi:', error);
    res.status(500).json({ message: 'Lỗi server khi xóa câu hỏi.' });
  }
});
// PUT /api/questions/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { question, correct_answer, incorrect_answers } = req.body;

    if (!question || !correct_answer || !Array.isArray(incorrect_answers) || incorrect_answers.length !== 3) {
      return res.status(400).json({ message: 'Dữ liệu cập nhật không hợp lệ.' });
    }

    const updated = await Question.findByIdAndUpdate(
      id,
      {
        question,
        correct_answer,
        incorrect_answers
      },
      { new: true } // Trả về bản ghi sau khi cập nhật
    );

    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy câu hỏi để cập nhật.' });
    }

    res.status(200).json({ message: 'Cập nhật câu hỏi thành công.', question: updated });
  } catch (error) {
    console.error('Lỗi khi cập nhật câu hỏi:', error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật câu hỏi.' });
  }
});

  
  
module.exports = router;

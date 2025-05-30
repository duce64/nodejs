const express = require('express');
const router = express.Router();
const ExamResult = require('../models/quizResultSchema');
const rateLimit = require('express-rate-limit');

// Giới hạn: tối đa 100 request mỗi 15 phút
const categoryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
});

// Áp dụng middleware cho toàn bộ route
router.use(categoryLimiter);

// ✅ POST: Thêm kết quả
router.post('/add', async (req, res) => {
  try {
    const {
      name, score, status, date,
      categoryId, questionId, userId,
      isTest = false, testId = null
    } = req.body;
    const finalTestId = isTest ? (testId ?? new mongoose.Types.ObjectId()) : null;
    // Nếu là bài kiểm tra thì kiểm tra trùng
    if (isTest && testId) {
      const existed = await ExamResult.findOne({ userId, testId });
      if (existed) {
        return res.status(400).json({ error: 'Bạn đã làm bài kiểm tra này rồi.' });
      }
    }
    // const cleanedTestId = (testId === 'null' || testId === '') ? null : testId;
    const result = new ExamResult({
      name,
      score,
      status,
      date: new Date(date),
      categoryId,
      questionId,
      userId,
      isTest,
      testId: finalTestId
    });

    await result.save();
    res.status(201).json({ message: 'Result saved successfully', result });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET /api/results/check?userId=...&testId=...
router.get('/check', async (req, res) => {
  try {
    const { userId, testId } = req.query;
    if (!userId || !testId) {
      return res.status(400).json({ error: 'Thiếu userId hoặc testId' });
    }

    const result = await ExamResult.findOne({
      userId,
      testId,
      isTest: true // ✅ chỉ kiểm tra bài thi chính thức
    });

    res.status(200).json({ hasTaken: !!result });
  } catch (error) {
    console.error("Error checking test:", error);
    res.status(500).json({ error: "Lỗi kiểm tra kết quả" });
  }
});

// ✅ GET kết quả theo user
router.get('/by-user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await ExamResult.find({ userId }).sort({ date: -1 });
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching results by userId:", err);
    res.status(500).json({ error: 'Failed to fetch results for user' });
  }
});

// ✅ GET tất cả kết quả
router.get('/', async (req, res) => {
  try {
    const results = await ExamResult.find().sort({ date: -1 }).populate('userId', 'username');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// ✅ GET kết quả theo testId
router.get('/by-test/:testId', async (req, res) => {
  try {
    const { testId } = req.params;
    const results = await ExamResult.find({ testId }).populate('userId', 'username');
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching results by testId:", err);
    res.status(500).json({ error: 'Failed to fetch results for test' });
  }
});

module.exports = router;

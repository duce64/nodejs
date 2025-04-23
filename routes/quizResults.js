const express = require('express');
const router = express.Router();
const ExamResult = require('../models/quizResultSchema'); // Đường dẫn đến file quizResultSchema.js

// POST /api/results/add
router.post('/add', async (req, res) => {
  try {
    const { name, score, status, date, categoryId, questionId, userId } = req.body;

    const result = new ExamResult({
      name,
      score,
      status,
      date: new Date(date),
      categoryId,
      questionId,     // là Number
      userId          // là ObjectId từ bảng User
    });

    await result.save();
    res.status(201).json({ message: 'Result saved successfully', result });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
// GET /api/results/by-user/:userId
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
// GET tất cả kết quả
router.get('/', async (req, res) => {
  try {
    const results = await ExamResult.find().sort({ date: -1 }).populate('userId', 'username');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

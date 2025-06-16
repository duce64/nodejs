// // routes/uploadDocx.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const mammoth = require('mammoth');

// const upload = multer();

// router.post('/', upload.single('file'), async (req, res) => {
//   try {
//     const buffer = req.file.buffer;
//     const result = await mammoth.extractRawText({ buffer });
//     const text = result.value;

//     // Bạn có thể parse text để chia nhỏ câu hỏi nếu muốn ở đây
//     res.json({ success: true, rawText: text });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// module.exports = router;
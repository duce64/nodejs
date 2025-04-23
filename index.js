require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const User = require('./models/user');
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(express.json());


const categoryRoutes = require('./routes/category');
app.use('/api/categories', categoryRoutes);
const questionRoutes = require('./routes/questionPackage');
app.use('/api/questions', questionRoutes);
// Import routes
const questionRoutess = require('./routes/question');
// Route
const examResultRoutes = require('./routes/quizResults');
app.use('/api/results', examResultRoutes);
// Sử dụng routes
app.use('/api/questions', questionRoutess);
// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Kết nối MongoDB thành công'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Đăng ký
app.post('/register', async (req, res) => {
  try {
    const { username, password, role, detail, department,fullname } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Tài khoản đã tồn tại' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      role,
      detail,
      department,
      fullname
    });

    await user.save();
    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
  }
});
// Express route (Node.js)
app.put('/api/users/updateRole', async (req, res) => {
  const { userId, role } = req.body;
  try {
    await User.updateOne({ _id: userId }, { $set: { role } });
    res.json({ message: 'Role updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});
// DELETE /api/users/:id - Xoá user theo ID
app.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    res.status(200).json({ message: 'Đã xoá người dùng thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});
// GET tất cả người dùng
app.get('/getAllUser', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // loại bỏ password khỏi kết quả trả về
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});
// Đăng nhập
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu' });

    const token = jwt.sign({ userId: user._id, role: user.role,name:user.username,detail:user.detail,department:user.department,fullname:user.fullname }, process.env.JWT_SECRET, { expiresIn: '1d' });

    user.token = token;
    await user.save();

    res.json({ message: 'Đăng nhập thành công', token });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${process.env.PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Kết nối MongoDB
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/testdb?retryWrites=true&w=majority')
  .then(() => console.log('✅ Kết nối MongoDB thành công'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Middleware
app.use(express.json());

// Schema + Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', UserSchema);

// Route mẫu
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.listen(port, () => {
  console.log(`🚀 API đang chạy tại http://localhost:${port}`);
});

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  token: { type: String },
  detail: { type: String },          // ✅ Thêm dòng này
  department: { type: String }       // ✅ Thêm dòng này
});

module.exports = mongoose.model('User', userSchema);


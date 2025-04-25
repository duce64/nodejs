const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  token: { type: String },
  detail: { type: String },          // ✅ Thêm dòng này
  department: { type: String }       // ✅ Thêm dòng này
});
// Hàm kiểm tra mật khẩu cũ
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


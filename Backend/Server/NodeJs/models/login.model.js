const mongoose = require('mongoose'); // Import Mongoose

// Định nghĩa Schema cho tài khoản
const LoginSchema = new mongoose.Schema({
    loginName: { type: String, required: true, unique: true }, // Tên đăng nhập (duy nhất)
    password: { type: String, required: true } // Mật khẩu
});

// Tạo model từ Schema
const Login = mongoose.model('Login', LoginSchema);

module.exports = Login; // Xuất model

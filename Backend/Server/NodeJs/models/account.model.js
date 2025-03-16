const mongoose = require('mongoose'); // Import thư viện Mongoose để làm việc với MongoDB

// Định nghĩa Schema (cấu trúc của collection "accounts")
const AccountSchema = new mongoose.Schema({
    yourName: String,   // Tên chủ tài khoản
    loginName: String,  // Tên đăng nhập
    password: String,   // Mật khẩu
    phone: String       // Số điện thoại
});

// Tạo model từ Schema để thao tác với collection "accounts"
const Account = mongoose.model('Account', AccountSchema);

module.exports = Account; // Xuất model để sử dụng trong controller

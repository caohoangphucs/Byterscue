const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/hackathon2025'); // XÓA các tùy chọn cũ
        console.log("✅ Kết nối MongoDB thành công");
    } catch (err) {
        console.error("❌ Lỗi kết nối MongoDB:", err);
    }
};

module.exports = connectDB;

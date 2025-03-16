const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/hackathon2025', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Kết nối MongoDB thành công!");
    } catch (error) {
        console.error("Lỗi kết nối MongoDB:", error);
        process.exit(1); // Thoát chương trình nếu kết nối thất bại
    }
};

module.exports = connectDB;

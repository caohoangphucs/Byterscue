const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose để kết nối MongoDB
const cors = require('cors'); // Import CORS để cho phép kết nối từ frontend

const accountController = require('./controllers/account.controller'); // Import controller

const app = express(); // Khởi tạo ứng dụng Express

app.use(cors()); // Cho phép frontend gọi API từ domain khác
app.use(express.json()); // Middleware để đọc dữ liệu JSON từ request body

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/hackathon2025', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("Kết nối MongoDB thành công")) // Thành công
.catch(err => console.log("Lỗi kết nối MongoDB:", err)); // Báo lỗi nếu kết nối thất bại

// Định nghĩa các API, gọi controller để xử lý
app.post('/api/accounts', accountController.createAccount); // API tạo tài khoản
app.get('/api/accounts', accountController.getAllAccounts); // API lấy danh sách tài khoản

// Lấy PORT từ biến môi trường hoặc mặc định là 6000
const PORT = process.env.PORT || 5000;

// Khởi động server trên PORT
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));

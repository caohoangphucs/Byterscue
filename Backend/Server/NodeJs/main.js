const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose để kết nối MongoDB
const cors = require('cors'); // Import CORS để cho phép kết nối từ frontend

const chatbotController = require('./controllers/chatbot.controller'); // Import chatbot
const connectDB = require('./connects/db'); // Import kết nối MongoDB
const accountController = require('./controllers/account.controller'); // Import controller
const loginController = require('./controllers/login.controller')
const app = express(); // Khởi tạo ứng dụng Express

app.use(cors()); // Cho phép frontend gọi API từ domain khác
app.use(express.json()); // Middleware để đọc dữ liệu JSON từ request body

// Gọi hàm kết nối MongoDB
connectDB();

// Định nghĩa các API, gọi controller để xử lý
app.post('/api/chatbot', chatbotController.chatWithGemini); // API gọi chatbot
app.post('/api/accounts', accountController.createAccount); // API tạo tài khoản
app.get('/api/accounts', accountController.getAllAccounts); // API lấy danh sách tài khoản
// API đăng nhập
app.post('/api/login', loginController.login);

// Lấy PORT từ biến môi trường hoặc mặc định là 6000
const PORT = process.env.PORT || 5000;

// Khởi động server trên PORT
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));

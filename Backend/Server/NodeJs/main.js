const express = require('express'); // Import Express framework
const connectDB = require('./connects/db'); // Import kết nối MongoDB
const cors = require('cors'); // Import CORS để cho phép kết nối từ frontend

<<<<<<< HEAD

const connectDB = require('./connects/db'); // Import kết nối MongoDB
const accountController = require('./controllers/account.controller'); // Import controller
const loginController = require('./controllers/login.controller')
=======
// Import các Router
const chatbotRouter = require('./routers/chatbot.router');
const accountRouter = require('./routers/account.router');
const loginRouter = require('./routers/login.router');
const deletedUserRouter = require("./routers/deletedUser.router");
const dataUserRouter = require("./routers/dataUser.router")
const locationRouter = require("./routers/location.router")

>>>>>>> 3f7a99c (project moi)
const app = express(); // Khởi tạo ứng dụng Express

app.use(cors()); // Cho phép frontend gọi API từ domain khác
app.use(express.json()); // Middleware để đọc dữ liệu JSON từ request body  

// Gọi hàm kết nối MongoDB
connectDB();

<<<<<<< HEAD
// Định nghĩa các API, gọi controller để xử lý
app.post('/api/accounts', accountController.createAccount); // API tạo tài khoản
app.get('/api/accounts', accountController.getAllAccounts); // API lấy danh sách tài khoản
// API đăng nhập
app.post('/api/login', loginController.login);
app.get('/', (req, res) => {
    res.send('Tao là node nè con đĩ');
});
// Lấy PORT từ biến môi trường hoặc mặc định là 6000
=======
// Sử dụng các router
app.use('/api', chatbotRouter);
app.use('/api', accountRouter);
app.use('/api', loginRouter);
app.use("/api", deletedUserRouter);
app.use("/api", dataUserRouter);
app.use("/api", locationRouter);

// Lấy PORT từ biến môi trường hoặc mặc định là 5000
>>>>>>> 3f7a99c (project moi)
const PORT = process.env.PORT || 5000;

// Khởi động server trên PORT
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));

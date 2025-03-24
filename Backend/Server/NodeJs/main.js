const express = require('express'); // Import Express framework
const connectDB = require('./connects/db'); // Import kết nối MongoDB
const cors = require('cors'); // Import CORS để cho phép kết nối từ frontend

// Import các Router

const accountRouter = require('./routers/account.router');
const loginRouter = require('./routers/login.router');
const deletedUserRouter = require("./routers/deletedUser.router");
const dataUserRouter = require("./routers/dataUser.router")
const locationRouter = require("./routers/location.router")

const app = express(); // Khởi tạo ứng dụng Express

app.use(cors()); // Cho phép frontend gọi API từ domain khác
app.use(express.json()); // Middleware để đọc dữ liệu JSON từ request body  

// Gọi hàm kết nối MongoDB
connectDB();

// Sử dụng các router

app.use('/api', accountRouter);
app.use('/api', loginRouter);
app.use("/api", deletedUserRouter);
app.use("/api", dataUserRouter);
app.use("/api", locationRouter);

// Lấy PORT từ biến môi trường hoặc mặc định là 5000
const PORT = process.env.PORT || 5000;

// Khởi động server trên PORT
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));

const Login = require('../models/login.model'); // Import model Login

// API xử lý đăng nhập
exports.login = async (req, res) => {
    try {
        const { loginName, password } = req.body;

        // Kiểm tra tài khoản có tồn tại không
        const user = await Login.findOne({ loginName });
        if (!user) {
            return res.status(400).json({ message: "Tài khoản không tồn tại!" });
        }

        // Kiểm tra mật khẩu (chưa mã hóa)
        if (password !== user.password) {
            return res.status(400).json({ message: "Sai mật khẩu!" });
        }

        // Nếu đăng nhập thành công
        res.json({ message: "Đăng nhập thành công!", user });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

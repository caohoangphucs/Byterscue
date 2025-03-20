const Login = require('../models/account.model'); // Import model Account

// API xử lý đăng nhập
exports.login = async (req, res) => {
    try {
        const { loginName, password } = req.body;
     
        // Kiểm tra tài khoản có tồn tại không
        console.log(loginName)
        const user = await Login.findOne({ loginName });
        if (!user) {
            return res.status(400).json({ message: "Tài khoản không tồn tại!" });
        }

        // Kiểm tra mật khẩu (chưa mã hóa)
        if (password !== user.password) {
            return res.status(400).json({ message: "Sai mật khẩu!" });
        }

        // Nếu đăng nhập thành công
        res.json({ status: "true", user });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

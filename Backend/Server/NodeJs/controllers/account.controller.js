const Account = require('../models/account.model'); // Import model Account từ file models/accountModel.js

// API nhận dữ liệu từ frontend và lưu vào MongoDB
exports.createAccount = async (req, res) => {
    try {
        // Lấy dữ liệu từ request body
        const { yourName, loginName, password, phone } = req.body;

        // Tạo một bản ghi mới trong MongoDB dựa trên model Account
        const newAccount = new Account({ yourName, loginName, password, phone });

        // Lưu dữ liệu vào MongoDB
        await newAccount.save();
        
        // Gửi phản hồi thành công về frontend
        res.status(201).json({ ok: "true", account: newAccount });
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: "Lỗi lưu dữ liệu!", error });
    }
};

// API lấy danh sách tài khoản từ MongoDB
exports.getAllAccounts = async (req, res) => {
    try {
        // Lấy tất cả dữ liệu từ collection "accounts"
        const accounts = await Account.find();

        // Gửi danh sách tài khoản về frontend
        res.json(accounts);
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: "Lỗi lấy dữ liệu!", error });
    }
};

const DataUser = require("../models/dataUser.model"); // Import model

// API Xóa người dùng theo ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ URL

        // Kiểm tra xem ID có tồn tại trong MongoDB không
        const deletedUser = await DataUser.findOneAndDelete({ id });

        if (!deletedUser) {
            return res.status(404).json({ message: "Vị trí không tồn tại!" });
        }

        res.status(200).json({ message: "Đã xử lý xong vị trí này!", deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa vị trí!", error: error.message });
    }
};

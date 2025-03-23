const axios = require("axios");

// Hàm lấy dữ liệu từ backend khác
exports.fetchExternalData = async () => {
    try {
        // Gửi request GET đến API backend khác
        const response = await axios.get("http://byteforce.caohoangphuc.id.vn/python/node_comunicate/get_form_info"); // 🔹 Thay URL API backend khác

        
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ backend khác:", error.message);
        return null; // Nếu lỗi, trả về null
    }
};

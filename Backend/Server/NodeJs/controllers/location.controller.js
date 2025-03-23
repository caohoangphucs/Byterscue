const axios = require('axios'); // Import thư viện axios để gửi HTTP request
require('dotenv').config(); // Load biến môi trường từ file .env

// Hàm lấy kinh độ, vĩ độ từ địa chỉ người dùng gửi lên
const getCoordinates = async (req, res) => {
    try {
        const { address } = req.body; // Lấy địa chỉ từ request body
        if (!address) {
            return res.status(400).json({ message: "Vui lòng cung cấp địa chỉ!" }); // Kiểm tra nếu không có địa chỉ
        }

        const apiKey = process.env.OPENCAGE_API_KEY; // Lấy API Key từ biến môi trường
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

        const response = await axios.get(url); // Gửi request đến OpenCage API
        const data = response.data; // Nhận dữ liệu phản hồi từ API

        if (data.results.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy tọa độ cho địa chỉ này." }); // Nếu không có kết quả
        }

        const { lat, lng } = data.results[0].geometry; // Lấy kinh độ và vĩ độ từ kết quả đầu tiên

        return res.json({ address, latitude: lat, longitude: lng }); // Trả về tọa độ dưới dạng JSON
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message }); // Bắt lỗi nếu có vấn đề với API
    }
};

module.exports = { getCoordinates }; // Xuất hàm để dùng trong router

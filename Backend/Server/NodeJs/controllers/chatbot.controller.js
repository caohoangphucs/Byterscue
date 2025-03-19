const axios = require('axios'); // Import thư viện axios để gửi yêu cầu HTTP
require('dotenv').config(); // Nạp biến môi trường từ file .env để sử dụng API Key

// Hàm xử lý yêu cầu từ frontend
const chatWithGemini = async (req, res) => {
    try {
        const { message } = req.body; // Lấy dữ liệu 'message' từ request body
        if (!message) return res.status(400).json({ error: 'Message is required' }); // Kiểm tra nếu không có message thì trả về lỗi 400

        // Gửi yêu cầu đến API Gemini của Google
        const response = await axios.post( 
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-001:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: message }] }] // Định dạng tin nhắn theo chuẩn của Gemini
            },
            {
                headers: { 'Content-Type': 'application/json' } // Định dạng dữ liệu gửi đi
            }
        );

        // Trả phản hồi từ Gemini về cho frontend
        res.json({ botResponse: response.data.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Lỗi khi gọi API Gemini:", error.response?.data || error.message);
        res.status(500).json({ error: "Lỗi server khi gọi chatbot" });
    }
};

module.exports = { chatWithGemini }; // Xuất hàm để sử dụng trong main.js

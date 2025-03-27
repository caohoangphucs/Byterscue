const DataUser = require("../models/dataUser.model"); // Import model
const { getCoordinates } = require("../controllers/location.controller"); // Import hàm lấy tọa độ
const { fetchExternalData } = require("../controllers/getAPIfromPython.controller"); // Require controller mới
const axios = require('axios'); // Import axios để gọi API nếu cần


// API xử lý & lưu vị trí cứu hộ
exports.createLocation = async (req, res) => {
    try {
        console.log("Da chay dc roi");
        const receivedData = await fetchExternalData(); // Gọi hàm lấy dữ liệu từ backend khác

        if (!receivedData || !receivedData.message || !receivedData.address || !receivedData.priority) {
            return res.status(400).json({ message: "Dữ liệu từ backend khác chưa đầy đủ!" });
        }

        // Kiểm tra priority hợp lệ (chỉ có "low" hoặc "high")
        if (!["low", "high"].includes(receivedData.priority)) {
            return res.status(400).json({ message: "Priority không hợp lệ!" });
        }

        // Gửi địa chỉ qua location.controller để lấy tọa độ
        const locationResponse = await axios.post("http://localhost:5000/api/geocode", { address: receivedData.address });

        if (!locationResponse.data.latitude || !locationResponse.data.longitude) {
            return res.status(500).json({ message: "Không lấy được tọa độ từ địa chỉ!" });
        }

        const { latitude, longitude } = locationResponse.data;

        // Tìm ID lớn nhất hiện tại để tăng ID mới
        const lastRecord = await DataUser.findOne().sort({ id: -1 });
        const newId = lastRecord ? lastRecord.id + 1 : 1;

        // Tạo dữ liệu mới để lưu vào MongoDB
        const newLocation = new DataUser({
            id: newId,
            latitude,
            longitude,
            message: receivedData.message,
            address: receivedData.address,
            priority: receivedData.priority,
            isNew: true
        });
        
        await newLocation.save(); // Lưu vào MongoDB

        // Gửi dữ liệu JSON thuần lên API bên ngoài
        await axios.post(
            "http://byteforce.caohoangphuc.id.vn/python/node_comunicate/recieve_request",
            newLocation.toObject() // Chuyển Model thành JSON
        );

        res.status(201).json({ message: "Đã thông báo vị trí đến lực lượng hỗ trợ !", location: newLocation });
    } catch (error) {
        res.status(500).json({ message: "Lỗi lưu rồi!", error: error.message });
    }
};


exports.getAllLocations = async (req, res) => {
    try {
        // Lấy tất cả dữ liệu từ MongoDB
        const locations = await DataUser.find();

        // Kiểm tra nếu không có dữ liệu
        if (!locations || locations.length === 0) {
            return res.status(404).json({ message: "Không có dữ liệu!" });
        }


        // Gửi dữ liệu đến backend Python
        await axios.post(
            "http://byteforce.caohoangphuc.id.vn/python/node_comunicate/recieve_request",
            locations, // Gửi trực tiếp mảng
            { headers: { "Content-Type": "application/json" } } // Báo cho server biết rằng dữ liệu gửi đi là JSON
        );

        // Trả về danh sách dữ liệu
        res.status(200).json( {locations: locations });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu!", error: error.message });
    }
};


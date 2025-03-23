const express = require('express');
const router = express.Router(); // Tạo router Express
const { getCoordinates } = require('../controllers/location.controller'); // Import controller

// Định nghĩa endpoint để lấy kinh độ, vĩ độ từ địa chỉ
router.post('/geocode', getCoordinates);

module.exports = router; // Xuất router để dùng trong server
    
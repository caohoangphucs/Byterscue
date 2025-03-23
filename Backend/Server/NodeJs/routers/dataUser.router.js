const express = require("express");
const router = express.Router();
const dataUserController = require("../controllers/dataUser.controller");

// Tạo một vị trí mới và lưu vào "locations"
router.post("/locations", dataUserController.createLocation);
// lấy các phần tử trong mongodb
router.get("/locations", dataUserController.getAllLocations);

module.exports = router;

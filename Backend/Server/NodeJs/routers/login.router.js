const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");

// API đăng nhập
router.post("/login", loginController.login);

module.exports = router;

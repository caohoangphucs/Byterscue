const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");

// Tạo tài khoản
router.post("/accounts", accountController.createAccount);

// Lấy danh sách tài khoản
router.get("/accounts", accountController.getAllAccounts);

// Xuất router
module.exports = router;

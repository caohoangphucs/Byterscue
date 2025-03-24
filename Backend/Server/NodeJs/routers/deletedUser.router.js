const express = require("express");
const router = express.Router();
const deletedUserController = require("../controllers/deletedUser.controller");

// Route xóa người dùng theo ID
router.delete("/users/:id", deletedUserController.deleteUser);

module.exports = router;

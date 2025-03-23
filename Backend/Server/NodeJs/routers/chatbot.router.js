const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbot.controller");

// API chatbot
router.post("/chatbot", chatbotController.chatWithGemini);

module.exports = router;

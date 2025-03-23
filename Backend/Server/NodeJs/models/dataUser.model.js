const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // ID tự động tăng
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  message: { type: String, required: true },
  address: { type: String, required: true },
  priority: { type: String, enum: ["low", "high"], required: true },
  isNew: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Model
module.exports = mongoose.model("Location", LocationSchema);
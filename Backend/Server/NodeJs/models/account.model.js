const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    yourName: { type: String, required: true },
    loginName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }
});

module.exports = mongoose.model('Account', accountSchema);

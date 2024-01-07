const mongoose = require("mongoose");
const checkEmail = new mongoose.Schema({
    email: String,
    date: {
        type: Date,
        default: Date.now,
    }
});
const checkEmailModel = mongoose.model("CheckEmail", checkEmail);
module.exports = checkEmailModel;

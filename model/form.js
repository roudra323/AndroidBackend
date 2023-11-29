const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    department: String,
    mobile: String,
    age: Number,
    email: String,
    address: String,
    date: Date,
    takenBefore: Boolean,
    heradAboutUs: [String],
    problems: [String],
    counselingType: [String],
    counselingTime: [String],
    counselingDay: [String],
  });

  const User = mongoose.model('Form', userSchema);

  module.exports = User;
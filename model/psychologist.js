const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    min: [11, "Phone number must be at least 11 digits"],
  },
  presentAddress: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [255, "Password cannot exceed 255 characters"],
  },
  profilePicture: {
    type: String,
    default: "demo.jpg",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isSupperAdmin: {
    type: Boolean,
    default: false,
  },
});

user.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = user;

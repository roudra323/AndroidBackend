const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = require("../model/psychologist");
const User = mongoose.model("Psychologist", userSchema);
const path = require("path");
const fs = require("fs");

const profileData = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({ message: "Id parameter is missing" });
    }
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.body) {
      return res.status(400).json({ message: "Request body is empty" });
    }
    const result = await User.updateOne({ _id: id }, { $set: req.body });
    if (result.nModified === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!result.acknowledged) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", result });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both old and new passwords are required" });
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect old password" });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changeProfilePicture = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newProfilePicturePath = req.file.filename;
    // console.log(req.file);

    if (user.profilePicture && user.profilePicture != "demo.jpg") {
      const oldProfilePicturePath = path.join(
        __dirname,
        "..",
        "uploads",
        user.profilePicture
      );
      // console.log(oldProfilePicturePath);
      try {
        if (fs.existsSync(oldProfilePicturePath)) {
          fs.unlinkSync(oldProfilePicturePath);
        }
      } catch (deleteError) {
        console.error("Error deleting old profile picture:", deleteError);
      }
    }

    user.profilePicture = newProfilePicturePath;
    await user.save();

    res.json({
      message: "Profile picture changed successfully",
      req: req.file.filename,
    });
  } catch (error) {
    console.error("Error changing profile picture:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({ message: "Id parameter is missing" });
    }

    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  profileData,
  updateProfile,
  changePassword,
  changeProfilePicture,
  deleteUser,
};

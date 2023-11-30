const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = require("../model/psychologist");
const User = mongoose.model("Psychologist", userSchema);

const getDataAll = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const signup = async (req, res) => {
    try {
        // console.log(req.body);
        const signup = new User(req.body);
        await signup.save();
        res.status(200).json({
            message: "Singup successfully!",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "There was a server-side error!",
        });
    }
}

const signin= async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const id = user._id;
        const name = user.name;
        res.status(200).json({ message: "Login successful",id,name});

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getDataAll,signup,signin };
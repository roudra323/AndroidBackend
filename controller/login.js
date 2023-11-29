const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const signupSchema = require("../model/signupSchema");
const SignupModel = mongoose.model("Signup", signupSchema);


const loginData= async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await SignupModel.findOne({ email });
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

module.exports = loginData;

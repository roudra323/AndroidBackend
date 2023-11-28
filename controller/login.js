const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For password hashing
const signupSchema = require("../model/signupSchema");
const SignupModel = mongoose.model("Signup", signupSchema);

const loginData= async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user with the provided email exists
        const user = await SignupModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // If credentials are valid, you might want to create a session or generate a token
        // For simplicity, I'm just sending a success message in this example
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = loginData;

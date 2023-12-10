const mongoose = require("mongoose");
const signupSchema = require("../model/signupSchema");
const User = mongoose.model("Signup", signupSchema);

const signupData = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                message: "User already exists!",
            });
        } else {
            const signup = new User(req.body);
            await signup.save();
            res.status(200).json({
                message: "Singup successfully!",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "There was a server-side error!",
        });
    }
};

module.exports = signupData;

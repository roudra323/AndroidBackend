const mongoose = require("mongoose");
const signupSchema = require("../model/signupSchema");
const SignupModel = mongoose.model("Signup", signupSchema);

const signupData = async (req, res) => {
    try {
        const signup = new SignupModel(req.body);
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
};

module.exports = signupData;

const mongoose = require("mongoose");
const signupSchema = require("../model/signupSchema");
const User = mongoose.model("Signup", signupSchema);
const sendEmail = require("./email");
const crypto = require("crypto");
const Token = require("../model/token");


const signupData = async (req, res) => {
    try {
        const { email } = req.body;
        // console.log(req.body);
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User email already exists!",
            });
        }

        user = new User(req.body);
        await user.save();

        let token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const message = `${process.env.BASE_URL}/auth/verify/${user._id}/${token.token}`;
        await sendEmail(user.name,user.email, "Verify Email", message);
        console.log(message);

        res.send("An Email sent to your account please verify");

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "There was a server-side error!",
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { userId, token } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }

        const tokenDoc = await Token.findOneAndDelete({ userId, token });
        if (!tokenDoc) {
            return res.status(400).json({
                message: "Invalid or expired link!",
            });
        }

        user.verified = true;
        await user.save();

        res.send("Your account has been successfully verified!");
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
};

module.exports = { signupData, verifyEmail };

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const signupSchema = require("../model/signupSchema");
const User = mongoose.model("Signup", signupSchema);
require("dotenv").config();


exports.isAuth = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            // Verify the token asynchronously
            // console.log(token);
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            // Use 'await' when calling asynchronous functions
            const user = await User.findById(decode.userId);
            if (!user) {
                return res.status(401).json({ success: false, message: "Unauthorized access!" });
            }
            // Set the user in the request object
            req.user = user;
            next();
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized access!" });
        }
    } catch (error) {
        // Handle token verification errors
        console.error(error);
        return res.status(401).json({ success: false, message: "Unauthorized access!" });
    }
};

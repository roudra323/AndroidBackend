const Router = require("express").Router();
const path = require("path");
const { profileData, updateProfile,changePassword,changeProfilePicture } = require("../controller/profile");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,uniqueSuffix+ext);
    }
});

const upload = multer({ storage: storage });

Router.get("/:id", profileData);
Router.post('/updatePassword/:id',changePassword);
Router.post('/updateProfile/:id',updateProfile);
Router.post("/changeProfilePicture/:id",upload.single("profilePicture"),changeProfilePicture);


module.exports = Router;
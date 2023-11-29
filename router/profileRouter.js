const Router = require("express").Router();
const upload = require("../middleware/multerPicture");
const { profileData, updateProfile,changePassword,changeProfilePicture } = require("../controller/profile");

Router.get("/:id", profileData);
Router.post('/updatePassword/:id',changePassword);
Router.post('/updateProfile/:id',updateProfile);
Router.post("/changeProfilePicture/:id",upload.single("profilePicture"),changeProfilePicture);


module.exports = Router;
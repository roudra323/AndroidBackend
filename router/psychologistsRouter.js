const Router = require("express").Router();
const upload = require("../middleware/multerPicture");
const { getDataAll, signup, signin,addEmail } = require("../controller/psychologist");
const { profileData, updateProfile, changePassword, changeProfilePicture, deleteUser } = require("../controller/psychologistProfile");


Router.get("/", getDataAll);
Router.get("/:id", profileData);
Router.post("/signup", signup);
Router.post("/signin", signin);
Router.post('/updatePassword/:id', changePassword);
Router.post('/updateProfile/:id', updateProfile);
Router.post("/changeProfilePicture/:id", upload.single("profilePicture"), changeProfilePicture);
Router.get('/deleteAccount/:id', deleteUser);
//supper admin
Router.post("/addEmail/:UserId", addEmail);



module.exports = Router;
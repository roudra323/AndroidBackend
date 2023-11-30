const Router = require("express").Router();
const upload = require("../middleware/multerPicture");
const {articlePost,articleGetOne,articleGetAll,editPost,deletePost} = require("../controller/artical")

Router.get("/",articleGetAll);
Router.get("/:id", articleGetOne);
Router.post("/post",upload.single('articlePicture'),articlePost);
Router.post("/edit/:id",upload.single('articlePicture'), editPost);
Router.delete("/delete/:id", deletePost);


module.exports = Router;
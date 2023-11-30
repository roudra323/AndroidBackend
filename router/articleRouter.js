const Router = require("express").Router();
const upload = require("../middleware/multerPicture");
const {articlePost,articleGetOne,articleGetAll} = require("../controller/artical")

Router.get("/",articleGetAll);
Router.get("/:id", articleGetOne);
Router.post("/post", articlePost);

module.exports = Router;
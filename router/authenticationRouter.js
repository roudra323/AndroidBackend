const Router = require("express").Router();
const signupData = require("../controller/signup");
const loginData = require("../controller/login");


Router.post("/signup", signupData);
Router.post("/login",loginData);

module.exports = Router;
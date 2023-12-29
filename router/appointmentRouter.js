const Router = require("express").Router();
const {
  formDataAppoi,
  getFormDataAll,
  getFormDatabyId,
  getDatabyId,
  deleteData,
} = require("../controller/form");

Router.post("/", formDataAppoi); // add data
Router.get("/", getFormDataAll); // all data
Router.get("/:userId", getFormDatabyId); // user all data by userId
Router.get("/appointmentId/:id", getDatabyId); // user single data by id
Router.delete("/appointmentId/:id", deleteData); // delete data by id

module.exports = Router;

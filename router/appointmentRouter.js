const Router = require("express").Router();

const {formDataAppoi,getFormDataAll,getFormDatabyId,getDatabyId,deleteData,changeStatus} = require("../controller/form");

Router.post("/:id", formDataAppoi); // add data
Router.get("/", getFormDataAll); // all data
Router.get("/:userId", getFormDatabyId); // user all data by userId
Router.get("/appointmentId/:id", getDatabyId); // user single data by id
Router.delete("/appointmentId/:id", deleteData); // delete data by id
Router.post("/appointmentId/status/:id",changeStatus); // changeStatus by id

module.exports = Router;

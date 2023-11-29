require("dotenv").config();

const express = require("express");
const authRouter = require("./router/authenticationRouter.js");
const appointmentRouter = require("./router/authenticationRouter.js");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/appointment", appointmentRouter);

app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("Home page..");
});

const uri = process.env.URI;
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
connect();

app.listen(3000, () => {
  console.log("listening on port 3000");
});

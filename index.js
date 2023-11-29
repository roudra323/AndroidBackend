require("dotenv").config();
const express = require('express');
const authRouter = require("./router/authenticationRouter");
const appointmentRouter = require("./router/authenticationRouter");
const profileRouter = require("./router/profileRouter");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/appointment', appointmentRouter);
app.use('/profile',profileRouter);

app.post('/user', (req, res) => {
    console.log(req.body);
    res.status(200).send('Home page..');
});

app.get('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('Home page..');
});

const uri = process.env.uri;

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("connected to MongoDB");
    }
    catch (error) {
        console.error(error);
    }
}
connect();

app.listen(3000, () => {
    console.log('listening on port 3000');
});
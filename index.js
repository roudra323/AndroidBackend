const express = require('express');
const authRouter = require("./router/authenticationRouter.js");
const appointmentRouter = require("./router/authenticationRouter.js");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/appointment', appointmentRouter);


app.post('/user', (req, res) => {
    console.log(req.body);
    res.send('Home page..');
});

const uri = "mongodb+srv://nahid36:nahid36321@jnuhealth.9rwx41w.mongodb.net/?retryWrites=true&w=majority";
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
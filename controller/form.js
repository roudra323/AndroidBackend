const User = require("../model/form")

const formData = (req,res) => {
    console.log(req.body);
    console.log("nahid")
    const newUser = new User(req.body);
    newUser.save()
        .then(savedUser => {
            console.log('Form saved successfully:', savedUser);
            res.send("Saved successfully");
        })
        .catch(error => {
            res.send("Error saving From");
            console.error('Error saving From:', error);
        });
}

module.exports = formData;
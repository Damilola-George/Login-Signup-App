const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-db");

//check database connected or not
connect.then(() => {
    console.log("Database  Successfully Connected");
}).catch(() => {
    console.log("Error in Database Connection");
});

//create a schema

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//collection Part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
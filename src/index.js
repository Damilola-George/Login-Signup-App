//IT WORKS!!

const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const collection = require('./config');

const app = express();

//convert data into json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));




//Use EJS  as view Engine
app.set('view engine', 'ejs');

//static file
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

//Register USer
app.post('/signup', async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }
//check if user already exists in the database
const existingUser = await collection.findOne({ name: data.name });

if(existingUser) {
    res.send("User already exists, Please choose a different username");
} else {
    //hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword; //Replace the hashed password with original password

    const userdata = await collection.insertMany(data); //this mean a previouly added user would no longer
    console.log(userdata);                             //be added to the database
}

    
});


//Login user
app.post('/login', async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check) {
            res.send("User name cannot be found");
        }
        //compare the hashed password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch) {
            res.render("home");
        } else{
            req.send("wrong password");
        }
    } catch {
        res.send("Wrong Details");
    }
});




const port = 5000;

app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
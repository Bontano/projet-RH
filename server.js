require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const upload = require("./services/fileUploader");
const { array } = require("multer")


const companyRouter = require('./routes/companyRouter')
const employeeRouter = require('./routes/employerRouter')
const db = process.env.BDD_URL //path bdd a mettre ici
const app = express()

app.use(express.static('./assets')); 
app.use(session({secret: "azerty",saveUninitialized: true,resave: true}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(companyRouter)
app.use(employeeRouter)


app.listen(3001,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Je suis connecté');
    }
})

mongoose.set('strictQuery', false);
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connecter a la bdd");
    }
})
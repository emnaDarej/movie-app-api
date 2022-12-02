const http = require("http");
require("dotenv").config();
const express=require('express')
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var bodyParser = require("body-parser");
const session = require("express-session");
const mongoose=require('mongoose')
const app=express()


// session
/*app.use(
    /*session({
      key: "token",
      secret: process.env.TOKEN_TEXT,
      resave: false,
      saveUninitialized: false,
    })
  );*/

// Setting up Dependencies
app.use(express.json())
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Initializing Routes
const users=require('./routes/api/users')
const clients=require('./routes/api/clients')
// use routes

//item is for testing
app.use('/api/users',users)
app.use('/api/clients',clients)

app.all("*", (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on this server`, 404));
  });

//data base config

const url = 'mongodb://localhost:27017/Movie_app'
mongoose.connect(url).then(()=>console.log('mongo connected'))
.catch(err=>console.log("Mongos Error"+err))
const port=5000
const server = http.createServer(app);
server.listen(port,()=>console.log('Server running en port 5000'))
//C:\Users\PC\Desktop\files\2ing\projetWebAngularNode\projectsManagement
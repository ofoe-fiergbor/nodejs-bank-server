const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const accountRoutes =  require('./routes/account')
const bankRoutes =  require('./routes/bank')
const userRoute = require('./routes/user')


const server = express();

//MIDDLEWARES
server.use(bodyParser.json());

//routes
server.use(accountRoutes)
server.use(bankRoutes)
server.use(userRoute)

mongoose
  .connect(
    "mongodb+srv://codetrainUser:123ofoe321@cluster0.m7j44.mongodb.net/codetrain?retryWrites=true&w=majority",
  {useNewUrlParser:true, useUnifiedTopology: true}
    )
  .then((result) => {
    server.listen("3000", console.log("Server is Ready"));
  })
  .catch((err) => console.log(err));

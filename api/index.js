require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express()

const port = process.env.PORT;
const cors = require("cors");
app.use(cors());


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(process.env.MEAL_PLANNER_STRING)
.then(()=>{
 console.log(" connected to MongoDB");
}).catch((error)=>{
console.log("Error connecting to MongoDb", error);
});

app.listen(port, ()=>{
    console.log("server running on port: " + port);
})


const express = require("express");
const router = express.Router();
const serverless = require("serverless-http");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Import routes
const billsRoute = require("./routes/bills"); // This would pull the routes from the posts.js onto app.js and store it in a constant
//Middleware
app.use("/.netlify/functions/bills", billsRoute); //This would tell app.js that whenever the API call for posts would happen, then call the constant that save the other file
exports.handler = serverless(router);
//Route

app.get("/", (req, res) => {
  res.send("We are at home");
}); 
//CONNECT TO DB HERE

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB!")
);
app.listen(8000);

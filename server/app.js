//Dependacies for the server to work.
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const checkJwt = require("express-jwt");

//Configuration of the server
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;

//using cors for allowing http requests
app.use(cors());
//using express json so i can parse JSON
app.use(express.json());
//using morgan to make logs
app.use(morgan("combined"));

//Tells express where the static files is
app.use(express.static("../client/build"));
// for the env file, where the database string is

const uri = process.env.ATLAS_URI; //Using the enviorment file, thats connect to the database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

//Making connecting and open mongodb database
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

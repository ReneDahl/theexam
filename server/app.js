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
app.use(express.static("../client/build"));
const port = process.env.PORT || 8080;
const uri = process.env.ATLAS_URI;
//using cors for allowing http requests
app.use(cors());
//using express json so i can parse JSON
app.use(express.json());
//using morgan to make logs
app.use(morgan("combined"));

//Tells express where the static files is
app.use(express.static(path.resolve("..", "client", "build")));
// for the env file, where the database string is
let openPaths = [
  /^(?!\/api).*/gim, // Open everything that doesn't begin with '/api'
  "/api/users/authenticate",
  "/api/users/create",
  //able to fetch books and categories without login, but not POST
  {
    url: "/api/users",
    methods: ["GET"]
  },
  {
    url: "/api/users/createUser",
    methods: ["POST"]
  },
  {
    url: "/api/books",
    methods: ["GET"]
  },
  {
    url: "/api/category",
    methods: ["GET"]
  } // Open GET questions, but not POST.
];

// Validate the user using authentication. checkJwt checks for auth token.
const secret = process.env.SECRET || "the cake is a lie";
if (!process.env.SECRET) console.error("SECRET is undefined.");
app.use(checkJwt({ secret: secret }).unless({ path: openPaths }));

// This middleware checks the result of checkJwt
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    // If the user didn't authorize correctly
    res.status(401).json({ error: err.message }); // Return 401 with error message.
  } else {
    next(); // If no errors, send request to next middleware or route handler
  }
});

//requring the user and book model from the database access layer, using mongoose as a middleware to connect.
const userDal = require("./dal/user_dal")(mongoose);
const bookDal = require("./dal/book_dal")(mongoose);
const categoryDal = require("./dal/category_dal")(mongoose);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Database connected");

    //----Test data goes here ------------------------------------------------------
    await userDal.testUsers();
    await bookDal.testBooks();
    await categoryDal.testCategories();

    //----Routes goes here----------------------------------------------------------
    const usersRouter = require("./routers/user_router")(userDal, secret);
    app.use("/api/users", usersRouter);

    const booksRouter = require("./routers/book_router")(bookDal);
    app.use("/api/books", booksRouter);

    const categoriesRouter = require("./routers/category_router")(categoryDal);
    app.use("/api/category", categoriesRouter);
    //------------------------------------------------------------------------------
    app.get("*", (req, res) =>
      res.sendFile(path.resolve("..", "client", "build", "index.html"))
    );

    await app.listen(port);
    console.log(`The server is running on ${port}!!`);
  })
  .catch(error => {
    console.error(error);
  });

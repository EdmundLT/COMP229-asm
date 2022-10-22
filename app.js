// Created On 1 October 2022
// COMP229 Assignment 1
// Student Name: LONG TANG
// SID: 301225866
require("dotenv").config;
const path = require("path");
const express = require("express");
const app = express();
const router = require("./routes/router");
const { mongoConnect } = require("./database/mongo");
const PORT = process.env.PORT || 8000;
const methodOverride = require("method-override");
const session = require("express-session");
const businessContactRouter = require("./routes/bcontact.router");
const flash = require("express-flash");
const userRouter = require("./routes/user.router");
const passport = require("passport");
const cookieParser = require('cookie-parser')
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));


// index page
app.use("/", router);
app.use("/user", userRouter);
app.use("/bcontact", businessContactRouter);

function startServer() {
  mongoConnect();
  app.listen(PORT);
  console.log(`Server is listening on port ${PORT}`);
}
startServer();

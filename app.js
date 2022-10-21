// Created On 1 October 2022
// COMP229 Assignment 1
// Student Name: LONG TANG
// SID: 301225866
require("dotenv").config;
const path = require("path");
const express = require("express");
const app = express();
const router = require("./routes/index");
const { mongoConnect } = require("./database/mongo");
const PORT = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const businessContactRouter = require("./routes/bcontact.router");
const userRouter = require("./routes/user.router");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(express.static("public"));

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

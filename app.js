// Created On 1 October 2022
// COMP229 Assignment 1
// Student Name: LONG TANG
// SID: 301225866

const path = require('path');
const express = require("express");
const app = express();
const PORT = 8000;
const router = require("./routes/index")
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'))
app.use(express.static("public"));

// index page
app.use("/", router)

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);

// Created On 21 October 2022
// COMP229 Assignment 2
// Student Name: LONG TANG
// SID: 301225866
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  uid: String,
  username: String,
  password: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);

// Created On 21 October 2022
// COMP229 Assignment 2
// Student Name: LONG TANG
// SID: 301225866
const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
  email: String,
});

module.exports = mongoose.model("Contact", contactSchema);

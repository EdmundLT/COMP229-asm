// Created On 21 October 2022
// COMP229 Assignment 2
// Student Name: LONG TANG
// SID: 301225866
require("dotenv").config()
const MONGO_URL = process.env.MONGO_URL;
const mongoose = require('mongoose');
mongoose.connection.once("open", ()=>{
    console.log("MongoDB Connection Ready!");
})

async function mongoConnect () {
    await mongoose.connect(MONGO_URL)
}

module.exports = {
    mongoConnect
}
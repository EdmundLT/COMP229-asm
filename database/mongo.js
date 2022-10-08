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
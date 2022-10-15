const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
  email: String,
});

module.exports = mongoose.model("Contact", contactSchema);

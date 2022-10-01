// COMP229 Assignment 1 - LONG TANG - SID: 301225866

const express = require("express");
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');
app.set("view engine", "ejs");
app.use(express.static("public"));
// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});
app.use(bodyParser.urlencoded({ extended : false }));
// about page
app.get("/about", function (req, res) {
  res.render("pages/about", {title: "About Me"});
});

//contact
app.get("/contact", function (req, res) {
  res.render("pages/contact");
});

app.post("/form",function(req,res){
  var email=req.body.email;
  var message=req.body.message;
  var form={email, message};
  console.log(form);
  res.redirect("/")
})
//project
app.get("/project", function (req, res) {
  res.render("pages/project");
});

//services
app.get("/services", function (req, res) {
  res.render("pages/services");
});

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);

const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser');
router.get("/", function (req, res, next) {
    res.render("pages/index");
  });
  router.use(bodyParser.urlencoded({ extended : false }));
  // about page
  router.get("/about", function (req, res, next) {
    res.render("pages/about", {title: "About Me"});
  });
  
  //contact
  router.get("/contact", function (req, res, next) {
    res.render("pages/contact");
  });
//Form Submmision
  router.post("/form",function(req,res, next){
    var email=req.body.email;
    var message=req.body.message;
    var form={email, message};
    console.log(form)
    res.send("Successfully submit your message.")
  })
  //project
  router.get("/project", function (req, res, next) {
    res.render("pages/project");
  });
  
  //services
  router.get("/services", function (req, res, next) {
    res.render("pages/services");
  });

module.exports = router;

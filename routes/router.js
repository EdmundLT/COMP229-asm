/* Created On 1 October 2022
COMP229 Assignment 1
Student Name: LONG TANG
SID: 301225866 */
require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
//Index Controller
const {
  home,
  about,
  contact,
  contactForm,
  projects,
  services,
} = require("../controllers/index.controller");

router.use(bodyParser.urlencoded({ extended: false }));
// Index Page
router.get("/", home);
// about page
router.get("/about", about);
//contact
router.get("/contact", contact);
//Form Submmision
router.post("/form", contactForm);
//project
router.get("/project", projects);
//services
router.get("/services", services);

module.exports = router;

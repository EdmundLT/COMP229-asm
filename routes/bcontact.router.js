// Created On 21 October 2022
// COMP229 Assignment 2
// Student Name: LONG TANG
// SID: 301225866
require("dotenv").config();
const express = require("express");
const businessContactRouter = express.Router();
const {
  httpGetBusinessCotnact,
  httpPostBusinessContact,
  httpDeleteBusnessContact,
  httpUpdatePage,
  httpEditBusinessContact,
} = require("../controllers/bcontact.controller");
const { checkAuthenticated } = require("../controllers/user.controller");

//Business Contact Page

businessContactRouter.get("/home", checkAuthenticated, httpGetBusinessCotnact);
businessContactRouter.post("/addcontact", httpPostBusinessContact);
businessContactRouter.post("/editcontact", httpEditBusinessContact);
businessContactRouter.post("/delete/:id", httpDeleteBusnessContact);
businessContactRouter.post("/update/:id", httpUpdatePage);

module.exports = businessContactRouter;

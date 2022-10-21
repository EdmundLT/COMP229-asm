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

//Business Contact Page

businessContactRouter.get("/home", httpGetBusinessCotnact);
businessContactRouter.post("/addcontact", httpPostBusinessContact);
businessContactRouter.post("/editcontact", httpEditBusinessContact);
businessContactRouter.post("/delete/:id", httpDeleteBusnessContact);
businessContactRouter.post("/update/:id", httpUpdatePage);

module.exports = businessContactRouter;

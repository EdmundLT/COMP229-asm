// Created On 21 October 2022
// COMP229 Assignment 2
// Student Name: LONG TANG
// SID: 301225866
const express = require("express");
const passport = require("passport");
const UserRouter = express.Router();
const initializePassport = require("../passport/passport.config");
const {
  getUserByEmail,
  getUserById,
  httpGetHomePage,
  httpPostRegister,
  httpLogout,
  checkNotAuthenticated,
  checkAuthenticated,
} = require("../controllers/user.controller");
initializePassport(passport, getUserByEmail, getUserById);

UserRouter.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("pages/login", { caution: "" });
});

UserRouter.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/bcontact/home",
    failureRedirect: "/user/login",
    failureFlash: true,
  })
);

UserRouter.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("pages/register.ejs", { caution: "" });
});

UserRouter.post("/register", checkNotAuthenticated, httpPostRegister);

UserRouter.post("/logout", httpLogout);

module.exports = UserRouter;

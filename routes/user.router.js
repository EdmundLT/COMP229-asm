require("dotenv").config();
const express = require("express");
const userRouter = express.Router();

//Login Controller
const { login, loginAuth, logout } = require("../controllers/login.controller");
const {
  register,
  httpPostRegister,
} = require("../controllers/register.controller");

//Login
userRouter.get("/login", login);
userRouter.get("/logout", logout);
//Authenticate Login Information
userRouter.post("/auth", loginAuth);

//Register
userRouter.get("/register", register);
userRouter.post("/register", httpPostRegister);

module.exports = userRouter;